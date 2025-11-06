import { type Request, type Response, type NextFunction } from "express";
import Joi from "joi";

const profileSchema = Joi.object({
  bio: Joi.string().max(200).optional(),
  website: Joi.string().uri().optional().messages({
    "string.uri": "Website must be a valid URL (e.g., https://example.com)",
  }),
});

export const validateProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = profileSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));
    return res.status(400).json({ errors });
  }
  next();
};
