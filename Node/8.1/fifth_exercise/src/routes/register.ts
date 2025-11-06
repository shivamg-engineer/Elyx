import { Router, type Request, type Response } from "express";
import Ajv from "ajv";
import { combinedSchema } from "../schemas/combinedSchema.ts";

const router = Router();
const ajv = new Ajv({ allErrors: true, strict: false });
const validateUser = ajv.compile(combinedSchema);

router.post("/", (req: Request, res: Response) => {
  const valid = validateUser(req.body);

  if (!valid) {
    return res.status(400).json({ errors: validateUser.errors });
  }

  res.json({ success: true, message: "User data is valid!" });
});

export default router;
