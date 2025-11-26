import { Router, type Request, type Response } from "express";
import { VendorAuthService } from "../services/vendor-auth.service.ts";
// import { VendorRegisterDto, VendorLoginDto } from "../dtos/vendor-auth.dto";
import { validateDto } from "../../middleware/validate.middleware.ts";
import { VendorRegisterDto, VendorLoginDto } from "../dtos/vendor-auth.dto.ts";
import logger from "../../config/logger.ts";
import { log } from "console";
import { roleBasedLimiter } from "../../middleware/roleLimiter.ts";
const router = Router();
const service = new VendorAuthService();

const handleError = (err: any, res: Response) => {
  console.log("Error:", err.message);
  const dbErrorCodes = [
    "ECONNREFUSED",
    "ER_ACCESS_DENIED_ERROR",
    "PROTOCOL_CONNECTION_LOST",
    "ETIMEDOUT",
  ];

  if (dbErrorCodes.includes(err.code)) {
    return res.status(503).json({
      status: 503,
      message: "Service temporarily unavailable. Database is down.",
    });
  }
  if (
    err.name === "ValidationError" || // class-validator
    err.name === "BadRequestError" || // your custom
    err instanceof SyntaxError || // malformed JSON
    err.status === 400 ||
    err.code === "INVALID_INPUT"
  ) {
    return res.status(400).json({
      status: 400,
      message: err.message || "Bad Request",
    });
  }

  return res.status(500).json({ message: "Internal server error" });
};

/**
 * POST /auth/vendor/register
 * POST /auth/vendor/login
 * POST /auth/vendor/refresh
 */

router.post(
  "/register",
  roleBasedLimiter(),
  validateDto(VendorRegisterDto),
  async (req: Request, res: Response) => {
    try {
      log("NAME: ", req.body.name);
      const result = await service.register(req.body);
      logger.log("DTO NAME: ", req.body.name);

      res.status(201).json(result);
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);

router.post(
  "/login",
  roleBasedLimiter(),
  async (req: Request, res: Response) => {
    try {
      const result = await service.login(req.body);
      res.status(200).json(result);
    } catch (err: any) {
     return handleError(err, res);
    }
  }
);

router.post(
  "/refresh",
  roleBasedLimiter(),
  async (req: Request, res: Response) => {
    try {

      const token = req.body.refreshToken;
      if (!token)
        return res.status(400).json({ message: "refreshToken required" });

      const result = await service.refresh(token);
      res.status(200).json(result);

    } catch (err: any) {

      logger.error("Error in vendor refresh:", err.message);
      // res.status(401).json({ message: err.message });
      if (err.message.includes("Unauthorized")) {
        return res.status(401).json({ message: err.message }); // Unauthorized
      }

     return handleError(err, res);
    }
  }
);

export default router;
