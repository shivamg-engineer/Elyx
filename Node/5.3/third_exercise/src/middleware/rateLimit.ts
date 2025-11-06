import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import type { RateLimitRequestHandler } from "express-rate-limit";

// Define thresholds per role
const ROLE_LIMITS = {
  admin: { windowMs: 60_000, max: 10 },
  user: { windowMs: 60_000, max: 4 },
  guest: { windowMs: 60_000, max: 1 },
} as const;

// ✅ Create limiters at app initialization
const roleLimiters: Record<keyof typeof ROLE_LIMITS, RateLimitRequestHandler> = {
  admin: rateLimit({
    windowMs: ROLE_LIMITS.admin.windowMs,
    max: ROLE_LIMITS.admin.max,
    message: "Too many requests for role 'admin'. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  }),
  user: rateLimit({
    windowMs: ROLE_LIMITS.user.windowMs,
    max: ROLE_LIMITS.user.max,
    message: "Too many requests for role 'user'. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  }),
  guest: rateLimit({
    windowMs: ROLE_LIMITS.guest.windowMs,
    max: ROLE_LIMITS.guest.max,
    message: "Too many requests for role 'guest'. Try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  }),
};

// Middleware to select limiter per role
export const roleBasedRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Read role from header, default to 'guest'
  const roleHeader = typeof req.headers["x-user-role"] === "string"
    ? req.headers["x-user-role"].toLowerCase()
    : "guest";

  // Narrow to allowed roles
  const role = (roleHeader in roleLimiters ? roleHeader : "guest") as keyof typeof ROLE_LIMITS;

  // ✅ Use pre-created limiter
  return roleLimiters[role](req, res, next);
};