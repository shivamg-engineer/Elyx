const os= require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

const toGB = (bytes) => (bytes / (1024 ** 3)).toFixed(2);

console.log(`Total Memory: ${toGB(totalMemory)} GB`);
console.log(`Free Memory: ${toGB(freeMemory)} GB`);
console.log(`Used Memory: ${toGB(totalMemory - freeMemory)} GB`);