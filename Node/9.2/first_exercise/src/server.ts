import express from "express";
import authRoutes from "./routes/authRoutes.ts";
import downloadRoutes from "./routes/downloadRoutes.ts";

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/login", authRoutes);
app.use("/download", downloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
