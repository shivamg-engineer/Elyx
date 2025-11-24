import { Router,type Request,type Response } from "express";
import { UserAuthService } from "../services/user-auth.service.ts";
import { roleBasedLimiter } from "../../middleware/roleLimiter.ts";
// import { validateDto } from "../../common/middleware/validate-dto";
// import { UserRegisterDto, UserLoginDto } from "../dtos/user-auth.dto.ts";

const router = Router();
const service = new UserAuthService();

/**
 * POST /auth/user/register
 * POST /auth/user/login
 * POST /auth/user/refresh
 */

router.post("/register",roleBasedLimiter() ,async (req: Request, res: Response) => {
  try {
    const result = await service.register(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    if (err.message.includes("already exists")) {
      return res.status(409).json({ message: err.message }); // Conflict
    }
    res.status(400).json({ message: err.message }); // Bad request
  }
});

router.post("/login",roleBasedLimiter(), async (req: Request, res: Response) => {
  try {
    const result = await service.login(req.body);
    res.status(200).json(result);
  } catch (err: any) {
    if (err.message.includes("Invalid credentials")) {
      return res.status(401).json({ message: err.message }); // Unauthorized
    }
    res.status(400).json({ message: err.message }); // Bad request
  }
});

router.post("/refresh",roleBasedLimiter(), async (req: Request, res: Response) => {
  try {
    const token = req.body.refreshToken;
    if (!token) return res.status(400).json({ message: "refreshToken required" });

    const result = await service.refresh(token);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default router;
