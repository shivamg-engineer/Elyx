import { Router } from "express";
import { validateQuery } from "../middleware/validateQuery.ts";

const router = Router();

router.get("/users", validateQuery, (req, res) => {
  const { page, limit, sort } = req.query;
  res.json({
    success: true,
    message: "Query params are valid",
    query: { page, limit, sort }
  });
});

export default router;
