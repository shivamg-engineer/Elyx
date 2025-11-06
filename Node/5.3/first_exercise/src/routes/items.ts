import Router from "express";
import type {  Request, Response } from "express";

const router = Router();

const ITEMS = [
  { id: 1, name: "Red Shirt", category: "clothing" },
  { id: 2, name: "Blue Jeans", category: "clothing" },
  { id: 3, name: "Green Apple", category: "food" },
  { id: 4, name: "Banana", category: "food" },
  { id: 5, name: "Laptop", category: "electronics" },
];

// GET /items?page=1&limit=10&search=shirt&category=clothing
router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string)?.toLowerCase() || "";
  const category = (req.query.category as string)?.toLowerCase() || "";

  // 1. Filter items
  let filteredItems = ITEMS;

  if (search) {
    filteredItems = filteredItems.filter(item =>
      item.name.toLowerCase().includes(search)
    );
  }

  if (category) {
    filteredItems = filteredItems.filter(
      item => item.category.toLowerCase() === category
    );
  }

  // 2. Paginate results
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedItems = filteredItems.slice(start, end);

  // 3. Respond with metadata
  res.json({
    page,
    limit,
    totalItems: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / limit),
    results: paginatedItems,
  });
});

export default router;