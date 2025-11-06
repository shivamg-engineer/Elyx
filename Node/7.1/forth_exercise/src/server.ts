import express from "express";
import usersRouter from "./routes/users.ts";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.ts";

const app = express();
app.use(express.json());

// Serve Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use your API routes
app.use("/api/v1/users", usersRouter);

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📘 Swagger docs on http://localhost:3000/api-docs");
});