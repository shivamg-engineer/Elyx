import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to the uploads folder
const UPLOADS_DIR = path.resolve(__dirname, "../uploads");

// Time threshold: 30 days in milliseconds
// const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const THIRTY_SECONDS = 1000 * 30;

// Function to clean up old files
function cleanupOldFiles() {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      console.error("Failed to read uploads directory:", err);
      return;
    }

    const now = Date.now();

    files.forEach((file) => {
      const filePath = path.join(UPLOADS_DIR, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Failed to get file stats:", err);
          return;
        }

        const fileAge = now - stats.mtime.getTime(); // age in ms

        if (fileAge > THIRTY_SECONDS) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete file:", err);
            else console.log("Deleted old file:", file);
          });
        }
      });
    });
  });
}

// Run cleanup immediately
cleanupOldFiles();

// Optional: Run cleanup periodically, e.g., every day (24h)
setInterval(cleanupOldFiles, 24 * 60 * 60 * 1000);
