import express from "express";
import type {Request,Response} from "express";

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

// GET /api/users?page=1&limit=3
router.get("/users", (req: Request, res: Response) => {
  // Extract page & limit from query params, with default values
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  // Calculate start and end indexes
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Slice the data to return only the requested items
  const paginatedUsers = users.slice(startIndex, endIndex);

  // Optional metadata
  const totalPages = Math.ceil(users.length / limit);

  res.json({
    page,
    limit,
    totalUsers: users.length,
    totalPages,
    data: paginatedUsers,
  });
});

export default router;
