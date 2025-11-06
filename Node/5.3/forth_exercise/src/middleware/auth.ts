// src/auth.ts
import jwt from "jsonwebtoken";

export type UserRole = "admin" | "editor" | "viewer";

export interface UserPayload {
  id: number;
  username: string;
  role: UserRole;
}

const JWT_SECRET = "your_secret_key"; // Use env var in production

export const generateJWT = (user: UserPayload) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
};
