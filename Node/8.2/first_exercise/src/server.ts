import express from "express";
import registerRouter from "./routes/register.ts";

const app = express();

app.use(express.json());

// Register route
app.use("/register", registerRouter);

app.listen(3000, () => console.log("✅ Server running on port 3000"));
