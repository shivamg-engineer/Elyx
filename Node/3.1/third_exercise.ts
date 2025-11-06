// Use Promise.all to execute multiple promises in parallel.
// Example: Reading Multiple Files in Parallel
import {promises as fs} from 'fs';

async function readFilesInParallel() {
    try{
         const filePromises = [
            fs.readFile('file1.txt', 'utf-8'),
            fs.readFile('file2.txt', 'utf-8'),
            fs.readFile('file3.txt', 'utf-8')
        ];

         const [data1, data2, data3] = await Promise.all(filePromises);
 console.log('File1 contents:', data1);
        console.log('File2 contents:', data2);
        console.log('File3 contents:', data3);
    }catch (err) {
        console.error('Error reading files:', err);
    }
}
readFilesInParallel();