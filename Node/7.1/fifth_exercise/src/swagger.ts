import swaggerJSDoc from "swagger-jsdoc";

const option={
    definition:{
        info:{
            title:"My API",
            version:"1.0.0",
            description:"API documentation for my Express app",
        },
        servers:[
             {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ]
    },
    apis:["./src/**/*.ts"],
};

const swaggerSpec= swaggerJSDoc(option);
export default swaggerSpec;