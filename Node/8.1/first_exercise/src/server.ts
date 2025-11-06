import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import xss from "xss";
import { validateFields } from "./middleware/validateFields.ts";

const app = express();
app.use(express.json());

// Middleware: sanitize all inputs
const sanitizeInputs = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (data: any): any => {
    //     If the data is a string, we pass it through xss() from the xss library.
    // xss() will clean the string by removing potentially malicious HTML/JS code, like <script>alert("hack")</script>.
    if (typeof data === "string") return xss(data);

    // If the data is an object (like { username: "admin", password: "<script>alert(1)</script>" }) and not null:
    // We need to sanitize each property recursively.
    if (typeof data === "object" && data !== null) {
      const sanitized: any = {}; //Create a new empty object to store sanitized values.This prevents us from modifying the original object while iterating over it.

      // Loop through all properties of the object.
      // For each property (key), we recursively call sanitize(data[key]).
      // This ensures nested objects are also sanitized.
      for (const key in data) sanitized[key] = sanitize(data[key]);

      return sanitized;
    }

    return data;
  };

  req.body = sanitize(req.body);

  next();
};

app.use(sanitizeInputs);

// Login endpoint
app.post(
  "/login",
  validateFields(["username", "password"]),
  (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Basic validation: required fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (trimmedUser.length === 0 || trimmedPass.length === 0) {
      return res.status(400).json({ error: "Fields cannot be empty." });
    }

    // Example static validation (normally check DB)
    if (trimmedUser === "admin" && trimmedPass === "password123") {
      return res.json({ success: true, message: "Login successful!" });
    }

    return res.status(401).json({ error: "Invalid credentials." });
  }
);

app.listen(3000, () => console.log("✅ Server running on port 3000"));
