import { Router, type Request, type Response } from "express";
import { ProductService } from "../services/product.service.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto.ts";

const router = Router();
const productService = new ProductService();

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


//create
router.post(
  "/",
  validateDto(CreateProductDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    }  catch (err: any) {
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
  }
);

//get all
router.get(
  "/",
  authGuard("vendor", "user"),
  async (req: Request, res: Response) => {
    try {
      const {
        page = "1",
        limit = "10",
        search,
        category,
        minPrice,
        maxPrice,
        vendorId,
        sort = "newest",
      } = req.query;

      const query: any = {
        page: Number(page),
        limit: Number(limit),
        sort: String(sort),
      };

      // Only add properties if they actually exist

      if (search !== undefined) query.search = String(search);
      if (category !== undefined) query.category = String(category);

      if (minPrice !== undefined) query.minPrice = Number(minPrice);
      if (maxPrice !== undefined) query.maxPrice = Number(maxPrice);

      if (vendorId !== undefined) query.vendorId = Number(vendorId);

      const result = await productService.getPublicProducts(query);

      res.status(200).json({ success: true, ...result });
    }  catch (err: any) {
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
  }
);
// http://localhost:3000/api/product?name=Samsung

router.get(
  "/:id",
  authGuard("vendor", "user"),
  async (req: Request, res: Response) => {
    try {
      const product = await productService.findOne(Number(req.params.id));
      if (!product) return res.status(404).json({ message:  "Product not found" });
      res.status(200).json(product);
    } catch (err: any) {
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
  }
);

router.put(
  "/:id",
  validateDto(UpdateProductDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await productService.update(id, req.body);
      const product = productService.findOne(id);
      return res.status(404).json(product);
    }  catch (err: any) {
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
  }
);
//patch
router.patch(
  "/:id",
  validateDto(UpdateProductDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await productService.patch(id, req.body);
      const product = productService.findOne(id);
      res.status(200).json(product);
    }  catch (err: any) {
      // res.status(400).json({ error: err.message });
     return handleError(err, res);
    }
  }
);

router.delete(
  "/:id",
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await productService.delete(id);

      if (!deleted) return res.status(404).json({ error: "Product not found" });

      return res.status(200).json({ Message: `product with id ${id}`, deleted });
    } catch (err: any) {
      // res.status(400).json({ error: err.message });
      return handleError(err, res);
    }
  }
);

export default router;

// ✅ Public Product List — Base URL
// GET http://localhost:3000/api/products

// ✅ Test Pagination
// Page 1, limit 10
// GET http://localhost:3000/api/products?page=1&limit=10

// Page 2, limit 10
// GET http://localhost:3000/api/products?page=2&limit=10

// Page 5, limit 20
// GET http://localhost:3000/api/products?page=5&limit=20

// 🔎 Test Search
// GET http://localhost:3000/api/products?search=shoes

// 🎯 Test Category Filter
// GET http://localhost:3000/api/products?category=electronics

// 💰 Test Price Range
// Min only
// GET http://localhost:3000/api/products?minPrice=500

// Min + Max
// GET http://localhost:3000/api/products?minPrice=500&maxPrice=2000

// 🏪 Test Vendor Filter
// GET http://localhost:3000/api/products?vendorId=3

// ⬇ Test Sorting
// Newest first (default)
// GET http://localhost:3000/api/products?sort=newest

// Price low → high
// GET http://localhost:3000/api/products?sort=price_asc

// Price high → low
// GET http://localhost:3000/api/products?sort=price_desc

// 🔥 Full Example — All Filters Together
// GET http://localhost:3000/api/products?page=2&limit=10&search=laptop&category=electronics&minPrice=20000&maxPrice=60000&vendorId=5&sort=price_asc

//--------------------#######--Swagger--#######-------------------------------------------
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API for vendors and public listing for users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         vendorId:
 *           type: integer
 *         stock:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateProductDto:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - stock
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         stock:
 *           type: number
 *
 *     UpdateProductDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         stock:
 *           type: number
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product (Vendor Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDto'
 *     responses:
 *       200:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get public products with filters and pagination
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: Page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search keyword
 *       - name: category
 *         in: query
 *         schema:
 *           type: string
 *       - name: minPrice
 *         in: query
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         schema:
 *           type: number
 *       - name: vendorId
 *         in: query
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [newest, oldest, price_low, price_high]
 *         description: Sorting option
 *     responses:
 *       200:
 *         description: List of filtered products
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product (Vendor Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDto'
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product (Vendor Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
