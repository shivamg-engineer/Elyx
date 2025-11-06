// Convert a callback-based file read function to use Promises.s

/*
import fs from 'fs';

fs.readFile('example.txt','utf-8',(err,data)=>{
    if(err){
        console.log('Error reading file: ',err);
        return;
    }
    console.log('file contents: ',data);
});
*/
import { promises as fs } from "fs";
async function readFileAsync(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log("File contents:", data);
  } catch (err) {
    console.error("Error reading file:", err);
  }
}
readFileAsync('example.txt');
