// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);

// const filePath= path.join(__dirname,'data','file.txt');

// console.log('Joined Path:', filePath);
// console.log('File Extension:', path.extname(filePath));
// console.log('File Name:', path.basename(filePath));

import { promises as fs } from "fs";

async function readFileIfExists(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
    const content = await fs.readFile(filePath, "utf-8");
    console.log("File content:\n", content);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.error("File does not exist:", filePath);
    } else {
      console.error("Error reading file:", error);
    }
  }
}
// Example usage
readFileIfExists('output.txt');
readFileIfExists('nonexistent.txt');