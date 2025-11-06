import { promises as fs } from "fs";

async function writeFileContent(
  filePath: string,
  content: string
): Promise<void> {
  try {
    // await fs.writeFile(filePath, content, "utf-8");//overwritting everytime
    await fs.appendFile(filePath, content, "utf-8"); // append content
  } catch (error) {
    console.error("Error writing file:", error);
  }
}
writeFileContent("output.txt", "Hello, TypeScript!\n");
