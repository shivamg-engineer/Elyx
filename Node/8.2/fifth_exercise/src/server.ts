import express from "express";
import type { Request, Response } from "express";
import { validateQuery } from "./middleware/validateQuery.ts";

const app = express();
app.use(express.json());

app.use("/", validateQuery, (req: Request, res: Response) => {
  res.json({
    succcess: true, // ❌ typo here: should be "success"
    message: "Query params are valid",
    query: req.query
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
