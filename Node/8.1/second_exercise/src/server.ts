import express from "express";
import { validateFields} from "./middleware/validateFields.ts";

const app=express();
app.use(express.json());

app.post(
    "/login",
    validateFields(["username","password"]),//<--middleware
    (req,res)=>{
      const {username,password}=req.body;
      res.json({success:true, message:`Hello ${username}`});
    }
);
app.listen(3000, () => console.log("Server running on port 3000"));