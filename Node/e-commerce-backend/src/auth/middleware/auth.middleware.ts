import { type Request, type Response, type NextFunction } from "express";
import { verifyAccessToken } from "../auth.utils.ts";
import type { JwtPayload } from "../auth.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authGuard =
  (...allowedRoles: ("user" | "vendor")[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });

      const token = authHeader.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Invalid Authorization format" });

      // Trim and remove surrounding quotes if present (e.g., from JSON serialization)
      const cleanToken = token.trim().replace(/^["']|["']$/g, '');

      const payload = verifyAccessToken(cleanToken);

      // Role check
      if (!allowedRoles.includes(payload.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient permission" });
      }

      req.user = payload; // attach decoded token
      console.log(payload);
      next();
    } catch (err: any) {
      console.error("Auth guard error:", err.message);
      return res.status(401).json({ message: "Unauthorized: " + err.message });
    }
  };

export function allowRoles(...allowed: Array<"user" | "vendor">) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowed.includes(user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
}
