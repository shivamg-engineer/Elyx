#!/usr/bin/env node
// Simple Image Converter CLI using sharp
// Run: node image-converter.js input.jpg output-folder
import sharp from "sharp";

import fs from "fs";
import path from "path";

// Define an interface for size presets
interface ImageSize {
  name: string;
  width: number;
  height: number;
}

// Define target sizes
const sizes:ImageSize[]= [
  { name: "thumbnail", width: 150, height: 150 },
  { name: "medium", width: 800, height: 600 },
  { name: "large", width: 1920, height: 1080 },
];

// --- CLI Input ---
const [,, inputPath, outputDir] = process.argv;

if (!inputPath || !outputDir) {
  console.log("Usage: node image-converter.js <inputImage> <outputFolder>");
  process.exit(1);
}

// Ensure output folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// --- Main function ---
async function convertImage(inputPath: string, outputDir: string): Promise<void> {
  try {
    for (const size of sizes) {
      const outputPath = path.join(
        outputDir,
        `${path.basename(inputPath, path.extname(inputPath))}-${size.name}.jpg`
      );

      await sharp(inputPath)
        .resize(size.width, size.height, { fit: "cover" }) // crop to fit
        .toFile(outputPath);

      console.log(`✅ Created: ${outputPath}`);
    }

    console.log("🎉 All image sizes created successfully!");
  } catch (error: any) {
    console.error("❌ Error converting image:", error.message);
  }
}

// Run the converter
convertImage(inputPath, outputDir);

//Run Command
//npx ts-node src/image-converter-cli.ts src/input/cat.jpg src/converted
