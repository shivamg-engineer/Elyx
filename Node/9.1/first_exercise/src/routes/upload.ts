import { Router, type Request, type Response } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";


const router = Router();

// Ensure uploads folder exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Allow only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

// Upload route (single or multiple files)
router.post("/upload", (req: Request, res: Response) => {
  const uploadHandler = upload.any(); // accept any file(s)

  uploadHandler(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const files = (req.files as Express.Multer.File[]).map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      path: `/uploads/${file.filename}`,
    }));

    res.status(200).json({
      message: "Files uploaded successfully",
      files,
    });
  });
});

export default router;
