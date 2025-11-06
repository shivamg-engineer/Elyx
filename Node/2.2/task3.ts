import {promises as fs} from "fs";

async function createDirectory(dirPath: string): Promise<void> {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log('Directory created:', dirPath);
    } catch (error) {
        console.error('Error creating directory:', error);
    }
}

createDirectory('new_folder');
