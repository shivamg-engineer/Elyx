// src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Locale Formatting API",
      version: "1.0.0",
      description: "API that formats date and price using Intl for different locales",
    },
  },
  apis: ["./src/**/*.ts"], // Scans all your .ts files for Swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Mounts Swagger UI at /api-docs.
 */
export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
