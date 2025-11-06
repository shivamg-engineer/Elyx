// src/middleware/validateBatch.ts
import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
   name: Joi.string().min(2).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters long",
    "any.required": "Name is required",
  }),
});

// Define schema for the array of users

const batchSchema= Joi.array().items(userSchema).required();

export const validateBatchUsers = (req: Request, res: Response, next: NextFunction) => {

    const {error} = batchSchema.validate(req.body,{abortEarly:false});


  if (error) {
    // Format Joi error messages
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Batch validation failed",
      errors,
    });
  }

  next();
}