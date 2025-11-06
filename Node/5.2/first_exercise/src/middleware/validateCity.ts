import type { Request, Response, NextFunction } from "express";

export const validateCity = (req: Request, res: Response, next: NextFunction) => {
  const { city } = req.body;

  if (!city || city.trim() === "") {
    return res.status(400).json({ error: "City field is required." });
  }

  next();
};
