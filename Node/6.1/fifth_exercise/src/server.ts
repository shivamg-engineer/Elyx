import express from "express";
import type { Request, Response } from "express";

const app = express();
app.get("/format", (req: Request, res: Response) => {
  const { lang } = req.query; // e.g., ?lang=fr

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

  res.json({
    date: formattedDate,
    price: formattedPrice,
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

//use http://localhost:3000/format?lang=fr-FR