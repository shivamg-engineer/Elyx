import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

const users = [
    { id: 1, name: "Alice", city: "Delhi" },
    { id: 2, name: "Bob", city: "Mumbai" },
    { id: 3, name: "Charlie", city: "Chennai" },
    { id: 4, name: "David", city: "Pune" },
    { id: 5, name: "Eva", city: "Bangalore" },
    { id: 6, name: "Frank", city: "Kolkata" },
    { id: 7, name: "Grace", city: "Jaipur" },
    { id: 8, name: "Hannah", city: "Lucknow" },
    { id: 9, name: "Ian", city: "Hyderabad" },
    { id: 10, name: "Jack", city: "Ahmedabad" },
];

router.get("/search", (req: Request, res: Response): void => {

    const { name, city } = req.query;

    const filteredUsers = users.filter((user) => {
        const matchName = name
            ? user.name.toLowerCase().includes((name as string).toLowerCase())
            : true;

        const matchCity = city ? user.city.toLowerCase().includes((city as string).toLowerCase())
            : true;

        return matchName && matchCity;

    });

    res.json({
        totalResults: filteredUsers.length,
        filters:{name,city},
        data:filteredUsers,
    });
})

export default router;