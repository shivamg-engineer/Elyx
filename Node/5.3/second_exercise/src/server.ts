import express from "express";
import itemsRouter from "./routes/items.ts";

const app = express();
app.use("/items", itemsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
