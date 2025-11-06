import jwt from "jsonwebtoken";
import type { UserPayload } from "../middleware/auth.ts";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const EXPIRES_IN = "1h"; // optional

export const signJWT = (user: UserPayload): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN });
};