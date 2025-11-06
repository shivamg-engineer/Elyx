// Exercise 2: File Server

// Implement a file server that serves different file types.
// TODO:

// Determine content type based on file extension.
// Support .html, .css, .js, and .json files.

import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs";
import type { PathOrFileDescriptor } from "fs";
import { extname, join, dirname } from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getContentType(filePath: string): string {
  const ext = extname(filePath).toLowerCase();
  switch (ext) {
    case ".html": return "text/html";
    case ".css": return "text/css";
    case ".js": return "application/javascript";
    case ".json": return "application/json";
    default: return "text/plain";
  }
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) return;

  let filePath = req.url === "/" ? "/index.html" : req.url;
  const fullPath = join(__dirname, "public", filePath);

  readFile(fullPath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("404: File Not Found");
      return;
    }

    const contentType = getContentType(fullPath);
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`File server running at http://localhost:${PORT}`);
});
