import express from "express";
import type {Request,Response} from "express";

const router = express.Router();

const users = [
  { id: 1, name: "Alice", city: "Delhi" },
  { id: 2, name: "Bob", city: "Mumbai" },
  { id: 3, name: "Charlie", city: "Delhi" },
  { id: 4, name: "David", city: "Pune" },
  { id: 5, name: "Eva", city: "Mumbai" },
];

//  Route: Group by city and count
router.get("/group-by-city", (req: Request, res: Response): void => {
  // Group users by city
  const grouped = users.reduce((acc, user) => {
    const city = user.city;
    if (!acc[city]) {
      acc[city] = { users: [], count: 0 };
    }
    acc[city].users.push(user);
    acc[city].count++;
    return acc;
  }, {} as Record<string, { users: typeof users; count: number }>);

  res.json(grouped);
});

export default router;
