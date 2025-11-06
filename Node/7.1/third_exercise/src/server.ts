import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.ts";
import usersRouter from "./routes/users.ts";

const app = express();

app.use("/api/v1/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📘 Swagger docs on http://localhost:3000/api-docs");
});