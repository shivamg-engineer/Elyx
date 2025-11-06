import express from "express";
import type { Request,Response } from "express";

import { sanitizeComments } from "./middleware/sanitizeComments.ts";

const app= express();
app.use(express.json());

app.post("/comments", sanitizeComments,(req:Request,res:Response)=>{
   const { comment } = req.body;
  // Here you would normally store the comment in DB
  res.json({ success: true, sanitizedComment: comment });
})

app.listen(3000, () => console.log("✅ Server running on port 3000"));

// {
//   "comment": "Hello, this is a safe comment!"
// }
