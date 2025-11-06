import swaggerJsdoc from "swagger-jsdoc";

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MY API",
            version: "1.0.0",
            description: "API documentation for my Express app",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",// Custom server URL
                description: "Local development server"
            },
            {
                url: "https://api.myapp.com/v1", //  Example of production server
                description: "Production server",
            },
        ],
    },
    apis: ["./src/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(option);
export default swaggerSpec;
