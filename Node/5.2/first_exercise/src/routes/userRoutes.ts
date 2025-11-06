import express from "express";
import { validateCity } from "../middleware/validateCity.ts";

const router = express.Router();

router.post("/users", validateCity, (req, res) => {
  const { name, city } = req.body;

  // Here, city is guaranteed to exist (thanks to middleware)
  res.status(201).json({
    message: `User ${name} from ${city} created successfully!`,
  });
});

export default router;
