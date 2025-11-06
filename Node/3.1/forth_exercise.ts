// Refactor an existing function that suffers from callback hell into a Promise-based solution.

// import fs from 'fs';

// fs.readFile('file1.txt', 'utf-8', (err, data1) => {
//     if (err) return console.error('Error reading file1:', err);

//     fs.readFile('file2.txt', 'utf-8', (err, data2) => {
//         if (err) return console.error('Error reading file2:', err);

//         fs.readFile('file3.txt', 'utf-8', (err, data3) => {
//             if (err) return console.error('Error reading file3:', err);

//             console.log(data1, data2, data3);
//         });
//     });
// });

import { promises as fs } from "fs";

async function readFiles() {
  try {
    const data1 = await fs.readFile("file1.txt", "utf-8");
    const data2 = await fs.readFile("file2.txt", "utf-8");
    const data3 = await fs.readFile("file3.txt", "utf-8");

    console.log("File1 contents:", data1);
    console.log("File2 contents:", data2);
    console.log("File3 contents:", data3);
  } catch (err) {
    console.error("Error reading files:", err);
  }
}

readFiles();
