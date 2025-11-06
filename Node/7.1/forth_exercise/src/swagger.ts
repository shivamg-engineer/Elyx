import swaggerJSDoc from "swagger-jsdoc";

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            decription: "API documentation for my Express app",

        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],

    },
     apis: ["./src/**/*.ts"], // where your routes with @openapi comments live
};

const swaggerSpec = swaggerJSDoc(option);
export default swaggerSpec;