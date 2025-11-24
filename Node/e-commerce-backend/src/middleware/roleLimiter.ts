import type { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const limiters = {
    user: rateLimit({
        windowMs: 1 * 60 * 1000,//1 minute
        max: 30, //users get 30 req/min
        message: "Too many requests (user). slow Down!",
        standardHeaders: true,
        legacyHeaders: true
    }),

    vendor: rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 100, // vendors get more because they need dashboard operations
        message: "Too many requests (vendor). Slow down!",
        standardHeaders: true,
        legacyHeaders: false,
    }),
}

const throttles = {
    user: slowDown({
        windowMs: 1 * 60 * 1000, // 1 min window
        delayAfter: 20, // after 20 requests
        delayMs: 300// add 500ms delay to each request
    }),
    vendor: slowDown({
        windowMs: 1 * 60 * 1000,
        delayAfter: 60,
        delayMs: 150,
    }),
};

export function roleBasedLimiter() {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role || "user";

        const limiter = limiters[role];
        const throttle = throttles[role];

        limiter(req, res, (err: any) => {
            if (err) return;

            throttle(req, res, next);
        })
    }
}