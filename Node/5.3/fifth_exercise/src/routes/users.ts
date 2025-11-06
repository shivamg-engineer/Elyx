import type { Request, Response } from "express";
import { Router } from "express";
import { redis } from "../redisClient.ts";


const router = Router();

// Simulated database
const USERS_DB = [
  { id: 1, name: "Alice", age: 25, city: "New York" },
  { id: 2, name: "Bob", age: 30, city: "Los Angeles" },
  { id: 3, name: "Charlie", age: 35, city: "Chicago" },
];

// Helper: simulate DB fetch
const findUserById = async (id: number) => USERS_DB.find((u) => u.id === id);

// 🔹 GET /users/:id — fetch user (with Redis cache)
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cacheKey = `user:${id}`;

  try {
    // 1️⃣ Try fetching from Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Cache hit");
      return res.json(JSON.parse(cached));
    }

    console.log("⚙️ Cache miss, fetching from DB...");
    const user = await findUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2️⃣ Store in cache for future requests
    await redis.set(cacheKey, JSON.stringify(user), "EX", 60); // expires in 60 sec

    return res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "server error" });
  }
});

// PUT /users/:id — update user + invalidate cache
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, age, city } = req.body;
  const cacheKey = `user:${id}`;

  const user = USERS_DB.find((u) => u, id === id);
  if (!user) return res.status(404).json({ message: "User not found" });

  //update in DB
  user.name = name ?? user.name;
  user.age = age ?? user.age;
  user.city = city ?? user.city;

  await redis.set(cacheKey, JSON.stringify(user), "EX", 60);
  // ✅ Send response to client
  res.json({
    message: "User updated successfully and cache refreshed",
    user,
  });
});

// 🔹 DELETE /users/:id — delete user + remove from cache
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const cacheKey = `user:${id}`;

  const index = USERS_DB.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ message: "user not found" });

  USERS_DB.splice(index, 1);
  // 1️⃣ Invalidate cache
  await redis.del(cacheKey);
  res.json({ message: "User deleted and cache cleared" });
});

export default router;
