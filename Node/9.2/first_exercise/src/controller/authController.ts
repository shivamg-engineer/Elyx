import type { Request, Response } from "express";
import {sign} from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

// Dummy users database
const users = [
  { id: 1, username: "shivam", password: "1234", role: "user" },
  { id: 2, username: "admin", password: "admin", role: "admin" },
];

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Generate JWT
  const payload = { id: user.id, username: user.username, role: user.role };
  const token = sign(
    payload,
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
