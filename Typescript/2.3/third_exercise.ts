function convert(value:number):string;
function convert(value:string):number;

function convert(value: number | string): string | number { 
    if (typeof value === "number") {
    return value.toString(); // Convert number → string
  } else {
    return parseFloat(value); // Convert string → number
  }
}

console.log(convert(123));
console.log(convert("456.78"));