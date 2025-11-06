import { Router } from "express";
import { login } from "../controller/authController.ts";

const router = Router();

router.post("/", login);

export default router;
