import express from "express";
import type { Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const router = express.Router();

let users = [
    { id: 1, name: "Alice", city: "Delhi" },
    { id: 2, name: "Bob", city: "Mumbai" },
    { id: 3, name: "Charlie", city: "Delhi" },
];

// 🗑️ Delete a single user (protected)
router.delete("/users/:id", authMiddleware, (req: Request, res: Response) => {
    const idParam = req.params.id;
    if (!idParam) {
        res.status(400).json({ error: "Missing user ID parameter" });
        return;
    }

    const id = parseInt(idParam, 10);
    users = users.filter((u) => u.id !== id);
    res.json({ message: `User ${id} deleted successfully` });
});

// 🗑️ Delete all users (protected)
router.delete("/users", authMiddleware, (req: Request, res: Response) => {
    users = [];
    res.json({ message: "All users deleted successfully" });
});

// ✅ Example open route (no auth)
router.get("/users", (req: Request, res: Response) => {
    res.json(users);
});

export default router;
