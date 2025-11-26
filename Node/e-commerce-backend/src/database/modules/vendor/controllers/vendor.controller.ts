import { Router, type Request, type Response } from "express";
import { VendorService } from "../services/vendor.service.ts";
import type { Vendor } from "../models/vendor.model.ts";
import { authGuard } from "../../../../auth/middleware/auth.middleware.ts";
import { validateDto } from "../../../../middleware/validate.middleware.ts";
import {
  CreateVendorDto,
  PatchVendorDto,
  UpdateVendorDto,
} from "../dtos/vendor.dto.ts";

const router = Router();
const vendorService = new VendorService();

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

  return res.status(500).json({
    status: 500,
    message: "Internal server error",
  });
};

//create vendor
router.post(
  "/",
  validateDto(CreateVendorDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const vendor = await vendorService.create(req.body);
      res.status(201).json(vendor);
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);

// Get all vendors
router.get("/", authGuard("vendor"), async (req: Request, res: Response) => {
  try {
    const vendors: Vendor[] = await vendorService.findAll();
    if (!vendors) return res.status(404).json({ message: "Vendor not found" });
    return res.status(200).json(vendors);
  } catch (err: any) {
    return handleError(err, res);
  }
});

//Get vendor by id
router.get("/:id", authGuard("vendor"), async (req: Request, res: Response) => {
  try {
    const currentVendorId = req.user!.id; // from JWT
    const id = Number(req.params.id);
    const vendor = await vendorService.findOne(
      Number(req.params.id),
      currentVendorId
    );

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    return res.status(200).json(vendor);
  } catch (err: any) {
    return handleError(err, res);
  }
});

//update vendor
router.put(
  "/:id",
  validateDto(UpdateVendorDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const currentVendorId = req.user!.id; // from JWT
      const updated = await vendorService.update(
        Number(req.params.id),
        req.body,
        currentVendorId
      );
      if (!updated) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      const vendor = await vendorService.findOne(
        Number(req.params.id),
        currentVendorId
      );
      return res.status(200).json(vendor);
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);

//patch vendor
router.patch(
  "/:id",
  validateDto(PatchVendorDto),
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const currentVendorId = req.user!.id; // from JWT
      const patched = await vendorService.patch(
        Number(req.params.id),
        req.body,
        currentVendorId
      );

      if (!patched) {
        return res.status(404).json({ message: "Vendor not found" });
      }

      const vendor = await vendorService.findOne(
        Number(req.params.id),
        currentVendorId
      );
      return res.status(200).json(vendor);
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);
// Delete vendor
router.delete(
  "/:id",
  authGuard("vendor"),
  async (req: Request, res: Response) => {
    try {
      const currentVendorId = req.user!.id; // from JWT
      const deleted = await vendorService.softDelete(
        Number(req.params.id),
        currentVendorId
      );

      if (!deleted)
        return res.status(404).json({ message: "Vendor not found" });

      return res.status(200).json({ message: "Vendor deleted" });
    } catch (err: any) {
      return handleError(err, res);
    }
  }
);

export default router;

/**
 * @swagger
 * tags:
 *   name: Vendor
 *   description: Vendor management APIs
 */

/**
 * @swagger
 * /api/vendors:
 *   post:
 *     summary: Create a new vendor
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVendorDto'
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of vendors
 */

/**
 * @swagger
 * /api/vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor found
 *       404:
 *         description: Vendor not found
 */

/**
 * @swagger
 * /api/vendors/{id}:
 *   put:
 *     summary: Update vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vendor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateVendorDto'
 *     responses:
 *       200:
 *         description: Vendor updated
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/vendors/{id}:
 *   delete:
 *     summary: Delete vendor by ID
 *     tags: [Vendor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor deleted
 *       404:
 *         description: Vendor not found
 */
