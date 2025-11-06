import Router from "express";
import type {  Request, Response } from "express";

const router = Router();

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  date: string;
}

const ITEMS: Item[] = [
  { id: 1, name: "Red Shirt", category: "clothing", price: 25, date: "2024-10-02" },
  { id: 2, name: "Blue Jeans", category: "clothing", price: 45, date: "2024-09-12" },
  { id: 3, name: "Green Apple", category: "food", price: 3, date: "2024-08-15" },
  { id: 4, name: "Banana", category: "food", price: 2, date: "2024-10-05" },
  { id: 5, name: "Laptop", category: "electronics", price: 999, date: "2024-05-01" },
];

// Allowed fields for sorting
const ALLOWED_SORT_FIELDS = ["id", "name", "category", "price", "date"];

router.get("/", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = (req.query.search as string)?.toLowerCase() || "";
  const category = (req.query.category as string)?.toLowerCase() || "";
  const sortParam = (req.query.sort as string) || "";

  let filteredItems = ITEMS;

  // 1. Filtering
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

  // 2. Sorting (multi-field)
  if (sortParam) {
    const sortFields = sortParam.split(",").map(field => field.trim());
    const invalidFields = sortFields
      .map(f => f.replace("-", ""))
      .filter(f => !ALLOWED_SORT_FIELDS.includes(f));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        error: `Invalid sort field(s): ${invalidFields.join(", ")}. Allowed fields: ${ALLOWED_SORT_FIELDS.join(", ")}`
      });
    }

    filteredItems.sort((a, b) => {
      for (const field of sortFields) {
        const direction = field.startsWith("-") ? -1 : 1;
        const key = field.replace("-", "") as keyof Item;

        if (a[key] < b[key]) return -1 * direction;
        if (a[key] > b[key]) return 1 * direction;
      }
      return 0; // if equal in all sort fields
    });
  }

  // 3. Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedItems = filteredItems.slice(start, end);

  res.json({
    page,
    limit,
    totalItems: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / limit),
    results: paginatedItems,
  });
});

export default router;