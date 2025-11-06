import express from "express";
import { setupSwagger } from "./config/swagger.ts";
import formatRoute from "./routes/formatRoute.ts";
import userRoute from "./routes/userRoute.ts";


const app=express();

//  Swagger documentation
setupSwagger(app);

app.use("/",formatRoute);
app.use("/",userRoute);

app.listen(3000,()=>{
     console.log("Server running at http://localhost:3000");
  console.log("Swagger docs at http://localhost:3000/api-docs");
});