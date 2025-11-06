import express from "express";
import { authenticateJWT } from "./middleware/authenticate.ts";
import { authorizeRoles } from "./middleware/authorize.ts";
import { signJWT } from "./utils/jwt.ts";

const app = express();
app.use(express.json());

// Test login endpoint
app.post("/login", (req, res) => {
  const { username, role } = req.body;
  // In real apps: validate user + password
  const token = signJWT({ id: 1, username, role });
  res.json({ token });
});

// Protected routes
app.get("/admin-only", authenticateJWT, authorizeRoles("admin"), (req, res) => {
  res.send(`Hello Admin ${req.user?.username}`);
});

app.get("/editor-or-admin", authenticateJWT, authorizeRoles("admin", "editor"), (req, res) => {
  res.send(`Hello ${req.user?.role} ${req.user?.username}`);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
