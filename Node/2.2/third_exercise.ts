// Implement a function that renames a file.

//  In Node.js, you can use fs.rename (callback) or fs.promises.rename (Promise-based) to rename a file. 
// Since you’re using TypeScript/async functions, the promise-based version is cleaner.

import {promises as fs} from 'fs';
import path from 'path';

async function renameFile(oldName:string, newName:string):Promise<void> {
    
    try{
     const oldPath=path.join('.',oldName);
     const newPath= path.join('.',newName);

     await fs.rename(oldPath, newPath);
       console.log(`File renamed from "${oldName}" to "${newName}"`);
    }catch(error){
    console.log("ERROR in renaming a file :", error);
    }
}

renameFile('largeFile.txt', 'renamedFile.txt');