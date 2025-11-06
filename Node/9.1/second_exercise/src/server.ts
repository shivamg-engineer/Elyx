import express from "express";
import type { Request, Response, NextFunction } from "express";
import { upload } from "./upload.ts";

const app = express();

// Route to handle file upload
app.post(
  "/upload",
  upload.single("file"),
  (req: Request, res: Response) => {
    res.json({
      message: "File uploaded successfully!",
      file: req.file,
    });
  }
);

// ✅ Error handling middleware for file filter errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error && err.message.startsWith("Unsupported file type")) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));