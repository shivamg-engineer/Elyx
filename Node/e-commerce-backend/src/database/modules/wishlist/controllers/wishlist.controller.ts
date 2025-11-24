import { Router, type Request, type Response } from "express";
import { Wishlist } from "../models/wishlist.model.ts";
import { WishlistService } from "../services/wishlist.service.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import { CreateWishlistDto } from "../dtos/wishlist.dto.ts";

const router = Router();
const wishlistService = new WishlistService();


// Add to wishlist
router.post(
  "/",
  validateDto(CreateWishlistDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;  // logged-in user
      const { productId } = req.body;

      const item = await wishlistService.add(userId, productId);

      res.status(201).json({   success: true,
        message: "Item added to wishlist",
        data: item,});
    } catch (err: any) {
      res.status(400).json({ Message: err.message });
    }
  }
);

// Get user's wishlist
router.get("/", authGuard("user"), async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const items: Wishlist[] = await wishlistService.findAll(userId);

      return res.status(200).json({
        success: true,
        data: items,
      });
  } catch (err: any) {
     return res.status(500).json({ message: err.message });
  }
});


// Delete wishlist item
router.delete(
  "/:productId",
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const productId = Number(req.params.productId);

      const deleted = await wishlistService.remove(userId, productId);

       if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Wishlist item not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Item removed from wishlist",
      });
    } catch (err: any) {
      res.status(500).json({ Message: err.message });
    }
  }
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist management
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Add an item to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateWishlistDto'
 *     responses:
 *       201:
 *         description: Wishlist item added successfully
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get logged-in user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
 */

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Remove an item from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID to remove from wishlist
 *     responses:
 *       200:
 *         description: Wishlist item removed
 *       404:
 *         description: Wishlist item not found
 */
