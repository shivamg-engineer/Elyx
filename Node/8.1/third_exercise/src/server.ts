import express from "express";
import { validateRegistration } from "./middleware/validation.ts";

const app= express();
app.use(express.json());

app.post("/register",validateRegistration,(req,res)=>{
    res.json({ success: true, message: "Registration data is valid!" });
})

app.listen(3000, () => console.log("Server running on port 3000"));