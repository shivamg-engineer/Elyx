import { Router } from "express";
import { downloadImage } from "../controller/downloadController.ts";
import { authenticateToken } from "../middleware/authenticateToken.ts";

const router = Router();

router.get("/images/:filename", authenticateToken, downloadImage);

export default router;
