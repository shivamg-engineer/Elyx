import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to the uploads folder

const UPLOADS_DIR = path.resolve(__dirname, "../uploads");
const DATA_FILE = path.resolve(__dirname, "data/files.json"); // <-- updated path
const THIRTY_SEC = 30 * 1000;

interface FileMeta {
  id: string;
  originalName: string;
  storedName: string;
  path: string;
}

// Read metadata safely
function readMetadata(): FileMeta[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as FileMeta[];
  } catch {
    return [];
  }
}

// Save metadata
function saveMetadata(data: FileMeta[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function cleanupOldFiles() {
  
  const now = Date.now();
  const files: FileMeta[] = readMetadata();
  const updatedFiles: FileMeta[] = [];

  files.forEach((file) => {
    let deleteFile = false;

    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      const fileAge = now - stats.mtime.getTime();
      if (fileAge > THIRTY_SEC) {
        fs.unlinkSync(file.path);
        console.log("Deleted old file:", file.storedName);
        deleteFile = true;
      }
    } else {
      // File missing, remove from metadata
      console.log("File missing, removing from metadata:", file.storedName);
      deleteFile = true;
    }

    if (!deleteFile) {
      updatedFiles.push(file);
    }
  });

  // Save updated metadata
  saveMetadata(updatedFiles);
  console.log("Metadata updated. Current files:", updatedFiles.length);
}

// Run cleanup immediately
cleanupOldFiles();

// Optional: run periodically every 24 hours
// setInterval(cleanupOldFiles, 24 * 60 * 60 * 1000);