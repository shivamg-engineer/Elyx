import { Router,type Request,type Response } from "express";
import { VendorAuthService } from "../services/vendor-auth.service.ts";
// import { VendorRegisterDto, VendorLoginDto } from "../dtos/vendor-auth.dto";
import { validateDto } from "../../middleware/validate.middleware.ts";
import { VendorRegisterDto, VendorLoginDto } from "../dtos/vendor-auth.dto.ts";
import logger from "../../config/logger.ts";
import {log} from "console";
import { roleBasedLimiter } from "../../middleware/roleLimiter.ts";
const router = Router();
const service = new VendorAuthService();


/**
 * POST /auth/vendor/register
 * POST /auth/vendor/login
 * POST /auth/vendor/refresh
 */

router.post("/register", roleBasedLimiter(),validateDto(VendorRegisterDto), async (req: Request, res: Response) => {
  try {
    log("NAME: ", req.body.name);
    const result = await service.register(req.body);
    logger.log("DTO NAME: ", req.body.name);

    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", roleBasedLimiter(),async (req: Request, res: Response) => {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    logger.error("Error in vendor login:", err.message);
    res.status(400).json({ message: err.message });
  }
});

router.post("/refresh", roleBasedLimiter(),async (req: Request, res: Response) => {
  try {
    const token = req.body.refreshToken;
    if (!token) return res.status(400).json({ message: "refreshToken required" });
    const result = await service.refresh(token);
    res.status(200).json(result);
  } catch (err: any) {
    logger.error("Error in vendor refresh:", err.message);
    res.status(401).json({ message: err.message });
  }
});

export default router;
