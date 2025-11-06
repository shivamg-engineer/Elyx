// src/routes/userRoute.ts
import { Router,type Request,type Response } from "express";

const router = Router();


router.get("/user", (req: Request, res: Response) => {
  const name = req.query.name || "Guest";
  res.json({ message: `Hello, ${name}!` });
});

export default router;