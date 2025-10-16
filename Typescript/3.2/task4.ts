interface HasLength {
    length: number;
}

function logWithLength<T extends HasLength>(arg:T):void{
  console.log(`Length: ${arg.length}`);
}

logWithLength("Hello");
logWithLength([1, 2, 3]);
