import multer, {type FileFilterCallback} from "multer";

import {type Request } from "express";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

// A MIME type (short for Multipurpose Internet Mail Extensions type)
const allowedMimeTypes=[
    "image/jpeg",
    "image/png",
    "application/pdf",
    "text/plain",
];

const __filename= fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
// Absolute path to the uploads folder
const uploadDir = path.join(__dirname, "../uploads");

// Configure Multer storage (optional: can customize destination/filename)
const storage= multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
    filename:(req ,file,cb)=> {
        cb(null, Date.now()+"-"+file.originalname)
    },
});
// ✅ File filter to validate MIME type
const fileFilter=(
    req:Request,
    file:Express.Multer.File,
    cb:FileFilterCallback
)=>{
    if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`));
  }
}

// Export the configured multer middleware
export const upload = multer({ storage, fileFilter });