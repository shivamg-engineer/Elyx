import express from "express";
import type { Request,Response } from "express";
import {validateBatchUsers} from "./middleware/validateBatch.ts";

const app = express();
app.use(express.json());

app.post("/batch/users",validateBatchUsers,(req: Request, res: Response)=>{

    const users= req.body;
    res.json({
         success: true,
    message: "All users validated successfully!",
    users,
    });
})
app.listen(3000, () => console.log("✅ Server running on port 3000"));