import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

// ✅ Custom Joi rule using `.custom()`
const passwordSchema = Joi.string()
  .min(6)
  .max(20)
  .required()
  .custom((value, helpers) => {
    // Check if password contains at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);

    if (!hasUpperCase) {
      return helpers.error("any.custom", {
        message: "Password must contain atleast one uppercase letter",
      });
    }
     if (!hasLowerCase) {
      return helpers.error("any.custom", {
        message: "Password must contain atleast one lowercase letter",
      });
    }

    if (!hasSpecialChar) {
      // ❌ Return a custom validation error
      return helpers.error("any.custom", {
        message: "Password must contain at least one special character",
      });
    }
    // ✅ Return value if valid
    return value;
  })
  .messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 6 characters long",
    "string.max": "Password cannot exceed 20 characters",
    "any.custom": "{{#message}}", // Displays our custom message above
  });

// Middleware function
export const validatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = passwordSchema.validate(req.body.password, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0]?.message, // Show first error message
    });
  }

  next();
};
