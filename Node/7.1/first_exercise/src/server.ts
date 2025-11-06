import express from "express";
import { setupSwagger } from "./config/swagger.ts";

const app = express();

// Setup Swagger documentation
setupSwagger(app);

/**
 * @swagger
 * /format:
 *   get:
 *     summary: Format date and price according to a locale
 *     description: Returns localized date and price based on `lang` query parameter.
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           example: fr-FR
 *         description: Locale to format date and price
 *     responses:
 *       200:
 *         description: Successfully formatted date and price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: jeudi 31 octobre 2025
 *                 price:
 *                   type: string
 *                   example: 12 345,67 €
 */
app.get("/format", (req, res) => {
  const { lang } = req.query;
  const locale = typeof lang === "string" ? lang : "en-US";

  const date = new Date();
  const price = 12345.67;

  const formattedDate = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: locale.startsWith("fr") ? "EUR" : "USD",
  }).format(price);

  res.json({ date: formattedDate, price: formattedPrice });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
