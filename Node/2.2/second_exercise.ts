import fs from "fs";
import path from "path";

const filePath = path.join(".", "largeFile.txt");

const readStream = fs.createReadStream(filePath, {
  encoding: "utf-8", // read as text
  highWaterMark: 50 * 1024, // chunk size: 16 KB
});

readStream.on("data", (chunk) => {
  console.log("Received chunk:");
  console.log(chunk);
});

readStream.on("end",()=>{
 console.log('Finished reading file.');
})

readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});