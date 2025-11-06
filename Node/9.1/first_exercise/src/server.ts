import express from "express";
import type {Request,Response} from "express";
import uploadRoutes from "./routes/upload.ts";
import {fileURLToPath} from 'url';
import path from "path";

const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve uploaded files
app.use("/uploads",express.static(path.join(__dirname,'../uploads')));

// Routes
app.use("/api",uploadRoutes);

app.get("/",(req:Request,res:Response)=>{
    res.send('File upload api is running!');
})

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
