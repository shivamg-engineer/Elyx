import express from "express";
const router= express.Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               email:
 *                 type: string
 *                 example: alice@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Alice
 *                 email:
 *                   type: string
 *                   example: alice@example.com
 */

router.post("/",(req,res)=>{
    const {name,email}= req.body;
    res.status(201).json({id:1, name,email});
})

export default router;