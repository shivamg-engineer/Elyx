import express from "express";
import userRoutes from "../src/routes/userRoutes.ts";

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

app.listen(8080, () => {
  console.log("✅ Server running at http://localhost:8080");
});
