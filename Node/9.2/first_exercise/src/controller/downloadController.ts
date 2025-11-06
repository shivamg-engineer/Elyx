import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadImage = (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    if (!filename)
      return res.status(400).json({ message: "Filename is required" });

    const safeFilename = path.basename(filename);
    const filePath = path.join(__dirname, "..", "images", safeFilename);

    if (!fs.existsSync(filePath))
      return res.status(404).json({ message: "Image not found" });

    const contentType = mime.lookup(filePath) || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    console.log(`✅ User ${req.user?.username} downloaded ${safeFilename}`);
  } catch (error) {
    console.error("❌ Error downloading image:", error);
    res.status(500).json({ message: "Error downloading image" });
  }
};
