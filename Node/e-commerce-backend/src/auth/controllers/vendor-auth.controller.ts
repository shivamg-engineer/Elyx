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
  roleBasedLimiter(),validateDto(VendorLoginDto),
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



/**
 * @swagger
 * /auth/vendor/register:
 *   post:
 *     tags:
 *       - Vendor Auth
 *     summary: Register a new vendor
 *     description: Creates a new vendor account. Validates input using DTO validations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *               - storeName
 *               - gstin
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Deepak Kumar"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "deepak@example.com"
 *               phone:
 *                 type: string
 *                 example: "+919876543210"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               storeName:
 *                 type: string
 *                 example: "Deepak Enterprises Pvt Ltd"
 *               gstin:
 *                 type: string
 *                 example: "GSTIN12345"
 *     responses:
 *       201:
 *         description: Vendor registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Vendor registered successfully"
 *               vendorId: 101
 *       400:
 *         description: Validation or bad request error
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Invalid input data"
 *       503:
 *         description: Database unavailable
 *         content:
 *           application/json:
 *             example:
 *               status: 503
 *               message: "Service temporarily unavailable. Database is down."
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/vendor/login:
 *   post:
 *     tags:
 *       - Vendor Auth
 *     summary: Login a vendor
 *     description: Authenticates a vendor and returns access/refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "vendor@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "jwt_access_token_here"
 *               refreshToken: "jwt_refresh_token_here"
 *       400:
 *         description: Invalid or missing input
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Invalid input"
 *       503:
 *         description: Database unavailable
 *         content:
 *           application/json:
 *             example:
 *               status: 503
 *               message: "Service temporarily unavailable. Database is down."
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/vendor/refresh:
 *   post:
 *     tags:
 *       - Vendor Auth
 *     summary: Refresh vendor access token
 *     description: Generates a new access token using a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "jwt_refresh_token_here"
 *     responses:
 *       200:
 *         description: Successfully refreshed token
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "new_access_token_here"
 *       400:
 *         description: Missing refresh token or invalid data
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "refreshToken required"
 *       401:
 *         description: Unauthorized - invalid or expired refresh token
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       503:
 *         description: Database unavailable
 *         content:
 *           application/json:
 *             example:
 *               status: 503
 *               message: "Service temporarily unavailable. Database is down."
 *       500:
 *         description: Internal server error
 */
