import { Router, type Request, type Response } from "express";
import { UserService } from "../services/user.service.ts";
import { User } from "../models/user.model.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.ts";

const router = Router();
const userService = new UserService();

//create
router.post(
  "/",
  validateDto(CreateUserDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ Message: err.Message });
    }
  }
);

//getone
router.get("/:id", authGuard("vendor"), async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.findOne(id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ Message: err.Message });
  }
});

//getall
router.get("/", authGuard("vendor"), async (req: Request, res: Response) => {
  try {
    const users: User[] = await userService.findAll();
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ Message: err.Message });
  }
});

//update
router.put(
  "/:id",
  validateDto(UpdateUserDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await userService.update(id, req.body);
      const updatedUser = await userService.findOne(id);
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ Message: err.Message });
    }
  }
);
//patch
router.patch(
  "/:id",
  validateDto(UpdateUserDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await userService.update(id, req.body);
      const updatedUser = await userService.findOne(id);
      res.status(200).json(updatedUser);
    } catch (err: any) {
      res.status(400).json({ Message: err.Message });
    }
  }
);

//delete
router.delete(
  "/:id",
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await userService.softDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted" });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API (Vendor Only)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, vendor, admin]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateUserDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user (Vendor Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: User created successfully
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID (Vendor Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users (Vendor Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user information (Vendor Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user (Vendor Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
