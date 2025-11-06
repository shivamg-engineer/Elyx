// Implement error handling in a Promise chain.
import { promises as fs } from "fs";

// fs.readFile("file1.txt", "utf-8")
//   .then((data1) => {
//     console.log("File1 contents:", data1);
//     return fs.readFile("file2.txt", "utf-8");
//   })
//   .then((data2) => {
//     console.log("File2 contents:", data2);
//     return fs.readFile("file3.txt", "utf-8");
//   })
//   .then((data3) => {
//     console.log("File3 contents:", data3);
//   })
//   .catch((err) => {
//     // This will catch errors from any of the readFile calls
//     console.error("Error reading files:", err);
//   });


async function readFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf-8');
        console.log('File1 contents:', data1);

        const data2 = await fs.readFile('file2.txt', 'utf-8');
        console.log('File2 contents:', data2);

        const data3 = await fs.readFile('file3.txt', 'utf-8');
        console.log('File3 contents:', data3);
    } catch (err) {
        console.error('Error reading files:', err);
    }
}

readFiles();