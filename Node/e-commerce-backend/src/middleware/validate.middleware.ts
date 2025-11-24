import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body, {
      enableImplicitConversion: true,//"23" → 23.
      excludeExtraneousValues: false,
      exposeDefaultValues: true,
      exposeUnsetFields: true,//Even if a field is missing, DTO will still include it (undefined or default).
    });

    const errors = await validate(dtoInstance, {
      whitelist: true,//This is basically a filter against unwanted fields.ONLY keep fields that have validation decorators
      forbidNonWhitelisted: false,//If false → JUST REMOVE the bad fields (silent cleaning).If true → Throw an error like:
    });

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          field: err.property,
          constraints: err.constraints,
        })),
      });
    }
    req.body = dtoInstance; // transformed + validated DTO
    next();
  };
}
