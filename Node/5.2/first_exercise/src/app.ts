import express from "express";
import userRoutes from "./routes/userRoutes.ts";

const app = express();

app.use(express.json()); // to parse JSON body
app.use("/api", userRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
