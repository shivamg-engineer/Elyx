import { Router, type Request, type Response } from "express";
import { UserAuthService } from "../services/user-auth.service.ts";
import { roleBasedLimiter } from "../../middleware/roleLimiter.ts";
import { validateDto } from "../../middleware/validate.middleware.ts";
import { UserLoginDto, UserRegisterDto } from "../dtos/user-auth.dto.ts";
<<<<<<< HEAD
=======
import logger from "../../config/logger.ts";
>>>>>>> ac8ca4da (Initial commit)
// import { validateDto } from "../../common/middleware/validate-dto";
// import { UserRegisterDto, UserLoginDto } from "../dtos/user-auth.dto.ts";

const router = Router();
const service = new UserAuthService();

/**
 * POST /auth/users/register
 * POST /auth/users/login
 * POST /auth/users/refresh
 */

const handleError = (err: any, res: Response) => {
<<<<<<< HEAD
  console.log("Error:", err.message);
=======
  // Use structured logger instead of console.log for better observability
  logger.error(err?.message ?? 'Unhandled error in auth controller', { stack: err?.stack });
>>>>>>> ac8ca4da (Initial commit)
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

router.post(
  "/register",
  roleBasedLimiter(),validateDto(UserRegisterDto),
  async (req: Request, res: Response) => {
    try {
      const result = await service.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      if (err.message.includes("already exists")) {
        return res.status(409).json({ message: err.message }); // Conflict
      }

      return handleError(err, res);
    }
  }
);

router.post(
  "/login",
  roleBasedLimiter(),validateDto(UserLoginDto),
  async (req: Request, res: Response) => {
    try {
      const result = await service.login(req.body);
      res.status(200).json(result);
    } catch (err: any) {
      if (err.message.includes("Invalid credentials")) {
        return res.status(401).json({ message: err.message }); // Unauthorized
      }
      // res.status(400).json({ message: err.message }); // Bad request
      
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
      if(err.message.includes("Unauthorized")){
        return res.status(401).json({ message: err.message }); // Unauthorized
      }
      res.status(401).json({ message: err.message });
      
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
    
  }
);

export default router;


/**
 * @swagger
 * /auth/users/register:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Register a new user
 *     description: Creates a new user account. Returns conflict if email already exists.
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "+919876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             example:
 *               message: "User registered successfully"
 *               userId: 12
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: "Email already exists"
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
 * /auth/users/login:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Login user
 *     description: Authenticates a user and returns access and refresh tokens.
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
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "jwt_access_token_here"
 *               refreshToken: "jwt_refresh_token_here"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
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
 * /auth/users/refresh:
 *   post:
 *     tags:
 *       - User Auth
 *     summary: Refresh access token
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
 *         description: New access token issued
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "new_access_token_here"
 *       400:
 *         description: Missing refresh token
 *         content:
 *           application/json:
 *             example:
 *               message: "refreshToken required"
 *       401:
 *         description: Unauthorized or expired refresh token
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
 *         description: Internal server down
 */
