import type { Request, Response, NextFunction } from "express";
import {verify} from "jsonwebtoken";
import {type JwtPayload} from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number; username: string; role: string };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  verify(
    token,
    SECRET_KEY,
    (err: any, decoded: string | JwtPayload | undefined) => {
      if (err)
        return res.status(403).json({ message: "Invalid or expired token" });

      req.user = decoded as JwtPayload & { id: number; username: string; role: string };
      next();
    }
  );
};
