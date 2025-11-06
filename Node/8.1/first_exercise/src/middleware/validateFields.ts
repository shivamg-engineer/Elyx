import {
  type Request,
  type Response,
  type NextFunction
} from "express";

export const validateFields = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (
        !(field in req.body) || //field not present
        req.body[field] === null || //null value
        req.body[field].toString().trim() === "" // empty string
      ) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        fields: missingFields,
      });
    }
    next(); // all fields present → proceed
  };
};
