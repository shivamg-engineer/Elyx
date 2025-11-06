import {type Request,type Response,type NextFunction } from "express";
import validator from "validator";

export const validateRegistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, bio } = req.body;
  const errors: Record<string, string> = {};

  if (
    !username ||
    typeof username !== "string" ||
    username.trim().length === 0
  ) {
    errors.username = "Username is required.";
  } else if (!validator.isAlphanumeric(username)) {
    errors.username = "Username must contain only letters and numbers.";
  } else if (!validator.isLength(username, { min: 3, max: 20 })) {
    errors.username = "Username must be between 3 and 20 characters.";
  }

  //email validation
  if (!email || !validator.isEmail(email)) {
    errors.email = "Invalid email address";
  }

  //password validation
  if (!password || typeof password !== "string") {
    errors.password = "Password is required.";
  } else if (!validator.isLength(password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters long.";
  }else if(!/\d/.test(password)){
 errors.password = "Password must contain at least one number.";
  }else if (!/[A-Z]/.test(password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  }else if (!/[a-z]/.test(password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  }

    if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next(); // All validations passed

};
