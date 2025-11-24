import { Router, type Request, type Response } from "express";
import { CartService } from "../services/cart.service.ts";
import type { Cart } from "../models/cart.model.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import { AddToCartDto, PatchCartDto, UpdateCartDto } from "../dtos/cart.dto.ts";

const router = Router();
const cartService = new CartService();

router.post(
  "/",
  validateDto(AddToCartDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      const cart: Cart = await cartService.addOrUpdate(req.body);
      res.status(201).json(cart);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.get("/", authGuard("user"), async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const carts = await cartService.findAll(userId);
     res.status(200).json(carts);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(400).json({ error: "Something went wrong" });
  }
});

router.get("/:id", authGuard("user"), async (req: Request, res: Response) => {
  try {
    const cart: Cart | null = await cartService.findOne(Number(req.params.id));
    if (!cart) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(cart);
  } catch (err: any) {
     res.status(400).json({ error: err.message });
  }
});

router.put(
  "/:id",
  validateDto(UpdateCartDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      const cart = await cartService.update(Number(req.params.id), req.body);
      res.status(200).json(cart);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.patch(
  "/:id",
  validateDto(PatchCartDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      const updatedCart = await cartService.patch(
        Number(req.params.id),
        req.user!.id,
        req.body
      );
     res.status(200).json(updatedCart);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete(
  "/:id",
  authGuard("user"),
  async (req: Request, res: Response) => {
   try {
      const result = await cartService.softDelete(
        Number(req.params.id),
        req.user!.id
      );

      if (!result) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json({ message: "Cart item deleted" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Manage user cart items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         productId:
 *           type: integer
 *         quantity:
 *           type: integer
 *         addedAt:
 *           type: string
 *           format: date-time
 *         isAbandoned:
 *           type: boolean
 *         deletedAt:
 *           type: string
 *           nullable: true
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     AddToCartDto:
 *       type: object
 *       required: [productId, quantity]
 *       properties:
 *         productId:
 *           type: integer
 *         quantity:
 *           type: integer
 *
 *     UpdateCartDto:
 *       type: object
 *       required: [quantity]
 *       properties:
 *         quantity:
 *           type: integer
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add or update cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCartDto'
 *     responses:
 *       201:
 *         description: Cart item added or updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items for logged-in user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart item by ID
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCartDto'
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   patch:
 *     summary: Partially update cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchCartDto'
 *     responses:
 *       200:
 *         description: Cart item updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 */


/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Soft delete cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 */
