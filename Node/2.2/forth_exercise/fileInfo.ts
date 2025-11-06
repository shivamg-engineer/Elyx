import { promises as fs } from 'fs';
import * as path from 'path';


// export async function fileInfo(filePath: string): Promise<void> {
export  const fileInfo=async(filePath:string) =>{
    try {
        const absolutePath = path.resolve(filePath);

        // Check if the file exists
        await fs.access(absolutePath);

        // Get metadata
        const stats = await fs.stat(absolutePath);

        console.log(`\n File Information`);
        console.log(`---------------------------`);
        console.log(`Path: ${absolutePath}`);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Created: ${stats.birthtime}`);
        console.log(`Modified: ${stats.mtime}`);
        console.log(`Is File: ${stats.isFile()}`);
        console.log(`Is Directory: ${stats.isDirectory()}`);
        console.log('---------------------------\n');
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.error(` File does not exist: ${filePath}`);
        } else {
            console.error(' Error reading file info:', error);
        }
    }
}

// Get file path from CLI arguments
const args = process.argv.slice(2);
const filePath = args[0];

// TypeScript-safe check — prevents "string | undefined" error
if (!filePath) {
    console.error('Usage: node fileInfo.js <file-path>');
    process.exit(1);
}

// Call the async function
fileInfo(filePath);
