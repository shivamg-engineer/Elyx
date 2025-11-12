import { Router } from 'express';
const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter by product name or category
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/products', (req, res) => {
  res.json({ message: 'List of products' });
});

export default router;
