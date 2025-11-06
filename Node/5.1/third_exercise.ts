// Authentication with JWT

// Protect routes with JWT middleware.

// TODO: Implement a POST /login route that issues tokens upon successful authentication.

import express from "express";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload, VerifyErrors } from "jsonwebtoken";

const app = express();
app.use(express.json());

const users = [
  { id: 1, username: "alice", password: "12345", role: "admin" },
  { id: 2, username: "bob", password: "abcde", role: "user" },
];

const JWT_SECRET = "mysecretkey";

//  Generate JWT Token
function generateToken(user: any) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}
// Middleware to protect routes
function authenticationToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "Token missing" });

  jwt.verify(
    token,
    JWT_SECRET,
    (err: VerifyErrors | null, user: JwtPayload | string | undefined) => {
      if (err)
        return res.status(403).json({ error: "Invalid or expired token" });
      (req as any).user = user; // attach user info to req
      next();
    }
  );
}

// POST /login → Issue token on success
app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  const token = generateToken(user);
  res.json({ message: "Login successful", token });
});

// Protected route
app.get("/profile", authenticationToken, (req: Request, res: Response) => {
  res.json({ message: "Protected data", user: (req as any).user });
});

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("JWT Authentication API is running!");
});
// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`JWT Auth API running at http://localhost:${port}`);
});
