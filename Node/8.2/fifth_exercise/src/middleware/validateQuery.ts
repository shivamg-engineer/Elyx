import type { Request, Response, NextFunction } from "express";
import Joi, { type ValidationErrorItem } from "joi";

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.min": "Page must be at least 1"
  }),
  limit: Joi.number().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
  sort: Joi.string().valid("asc", "dsc").default("asc").messages({
    "any.only": "Sort must be either 'asc' or 'dsc'"
  }),
});

export const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = querySchema.validate(req.query, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail: ValidationErrorItem) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));
    return res.status(400).json({ success: false, errors });
  }

//   req.query = value; // ✅ replaces query with validated + default values
Object.assign(req.query,value);  
next();
};
