import express from "express";
import swaggerUi from "swagger-ui-express";

import usersRouter from "./routes/users.ts";
import swaggerSpec from "./swagger.ts";

const app = express();
app.use(express.json());
app.use("/users", (usersRouter));
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use(
    "/api-docs",
    swaggerUi.serve,

    swaggerUi.setup(swaggerSpec, {
        explorer: true,// adds a search bar
        customCss: ".swagger-ui .topbar {background-color: #4A90E2;}",//BLUE TOPBAR
        customSiteTitle: "My Custom API Docs",
        customfavIcon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        swaggerOptions: {
            docExpansion: "none", // "none" | "list" | "full"
            defaultModelsExpandDepth: -1, // hide schemas section
        },
    })
)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is lisntening on ${PORT}`);
});


// Exercise E: Experiment with Swagger UI configuration (like custom CSS or doc expansion settings).


// TODO: Pass additional options in swaggerUi.setup(swaggerSpec, { ...options }) to style the UI.