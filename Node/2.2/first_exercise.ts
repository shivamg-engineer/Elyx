// import {promises as fs} from "fs";

// async function writeFileContent(
//     filePath:string,
//     content:string
// ):Promise<void>{

//     try{
//         await fs.appendFile(filePath, content);

//     }catch(error){
//       console.error("Error writing file:", error);
//     }
// }
// writeFileContent("output.txt", "Hello, TypeScript!\n");

//alternate way
import fs from "fs";

async function writeFileContent(
  filePath: string,
  content: string
): Promise<void> {
  fs.appendFile("output.txt", "Appending with callback!\n", (err) => {
    if (err) {
      console.error("Error appending file:", err);
    } else {
      console.log("Content appended successfully!");
    }
  });
}
writeFileContent("output.txt", "Hello, TypeScript!\n");
