import express from "express";
import itemsRouter from "./routes/items.ts";
import { roleBasedRateLimiter } from "./middleware/rateLimit.ts";
const app = express();

// Apply rate limiter globally
app.use(roleBasedRateLimiter);

// Only parse JSON for routes that expect a body (POST/PUT)
app.use("/items", itemsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));