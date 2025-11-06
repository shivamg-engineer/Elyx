import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];

    // 1️⃣ Check if Authorization header exists
    if (!authHeader) {
        res.status(401).json({ error: "Missing Authorization header" });
        return;
    }

    // 2️⃣ Typically: Authorization: Bearer <token>
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Invalid Authorization format" });
        return;
    }

    // 3️⃣ Validate token (for demo, we accept only a fixed token)
    const validToken = "my-secret-token";

    if (token !== validToken) {
        res.status(403).json({ error: "Invalid or expired token" });
        return;
    }
    // 4️⃣ Token is valid → allow next handler
    next();
}