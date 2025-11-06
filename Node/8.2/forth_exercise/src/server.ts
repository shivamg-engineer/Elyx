import express from "express";
import type { Request, Response } from "express";
import { validatePassword } from "./middleware/validatePassword.ts";

const app = express();
app.use(express.json());

app.post("/check-password", validatePassword, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Password is valid!",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
