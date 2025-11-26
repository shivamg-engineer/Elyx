import { Router, type Request, type Response } from "express";
import { OrderService } from "../services/order.service.ts";
import type { Order } from "../models/order.model.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import { PlaceOrderDto, UpdateOrderDto, PatchOrderDto } from "../dtos/order.dto.ts";

const router = Router();
const orderService = new OrderService();

// Centralized error handler
const handleError = (err: any, res: Response) => {
  console.error("ERROR:", err.message);

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
    err.name === "ValidationError" ||      // class-validator
    err.name === "BadRequestError" ||      // your custom
    err instanceof SyntaxError ||          // malformed JSON
    err.status === 400 ||
    err.code === "INVALID_INPUT"
  ) {
    return res.status(400).json({
      status: 400,
      message: err.message || "Bad Request",
    });
  }


  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
};


// Place order
router.post(
  "/place",
  validateDto(PlaceOrderDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: missing userId" });
      }

      const userId: number = req.user.id;
      const role: string = req.user.role;

      const order = await orderService.placeOrder({
        ...req.body,
        userId,
        role,
      });

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
      });
    } catch (err: any) {
     return handleError(err, res);
    }
  }
);

// Get one order
router.get("/:id", authGuard("user", "vendor"), async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const userId: number = req.user.id;
    const role: string = req.user.role;
    const id = Number(req.params.id);

    const order = await orderService.findOne(id, userId, role);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (err: any) {
    return handleError(err, res);

  }
});

// Get all orders (vendor only)
router.get("/", authGuard("user","vendor"), async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const userId: number = req.user.id;
    const role: string = req.user.role;
    const id = Number(req.params.id);

    

    const orders: Order[] = await orderService.findAll(userId, role);

    return res.status(200).json(orders);
  } catch (err: any) {
    return handleError(err, res);
  }
});

// Update order
router.put(
  "/:id",
  validateDto(UpdateOrderDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: user not found" });
      }

      const userId: number = Number(req.user.id);
      const role: string = req.user.role;
      const id = Number(req.params.id);

      const updated = await orderService.update(id, userId, role, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Order updated successfully",
        updated,
      });
    } catch (err: any) {
      return handleError(err, res); 
    }
  }
);
//Patch order
router.patch(
  "/:id",
  validateDto(PatchOrderDto),
  authGuard("user"),
  async (req: Request, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
        return res
          .status(401)
          .json({ message: "Unauthorized: user not found" });
      }

      const userId: number = Number(req.user.id);
      const role: string = req.user.role;
      const id = Number(req.params.id);

      const patched = await orderService.patch(id, userId, role, req.body);

      if (!patched) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({
        success: true,
        message: "Order patched successfully",
        patched,
      });
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);

// Delete order
router.delete("/:id", authGuard("user"), async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const userId: number = Number(req.user.id);
    const role: string = req.user.role;
    const id = Number(req.params.id);

    const deleted = await orderService.delete(id, userId, role);

    if (!deleted) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted", deleted });
  } catch (error) {
    return handleError(error, res);
  }
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         vendorId:
 *           type: integer
 *         totalAmount:
 *           type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     PlaceOrderDto:
 *       type: object
 *       required: [items, paymentMethod]
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *         paymentMethod:
 *           type: string
 *
 *     UpdateOrderDto:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         paymentStatus:
 *           type: string
 */

/**
 * @swagger
 * /api/orders/place:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceOrderDto'
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Vendor Only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders for vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order details (user or vendor)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrderDto'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order (user only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
