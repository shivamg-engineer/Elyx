// src/middleware/authenticate.ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserPayload } from "./auth.ts"; // <-- Make sure you have this file

// declare global {
//   namespace Express {
//     interface Request {
//       user?: UserPayload; // Add user info to request
//     }
//   }
// }

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader:string|undefined = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token:string|undefined = authHeader.split(" ")[1] ?? '';// it is nullable
    if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    // Verify the JWT token
    const payload = jwt.verify(token, JWT_SECRET)as unknown as UserPayload;

    // Attach user payload to request
    req.user = payload;

    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
