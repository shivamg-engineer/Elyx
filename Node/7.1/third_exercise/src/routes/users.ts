import express from "express";
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of users
 *     responses:
 *       200:
 *         description: A list of users. [View all users](http://localhost:3000/users)
 *         links:
 *            GetUserById:
 *              operationId: getUserById
 *              parameters:
 *                userId: "$response.body#/0/id"
 *              description: The `id` value returned in the response can be used to get the specific user.
 */
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

export default router;
