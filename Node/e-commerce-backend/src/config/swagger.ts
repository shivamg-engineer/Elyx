import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "🛍️ E-Commerce Backend API (COD Model)",
      version: "1.0.0",
      description:
        "This API powers an e-commerce platform with vendor and user roles, product management, wishlist, cart, and COD orders.",
      contact: {
        name: "Shivam Gupta",
        email: "shivam@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis:['src/routes/**/*.ts','src/models/**/*.ts']
};
export const swaggerSpec = swaggerJSDoc(options);

// Helper function to attach Swagger to app
export const setupSwagger= (app:Express)=>{
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📘 Swagger docs available at http://localhost:3000/api-docs');
};