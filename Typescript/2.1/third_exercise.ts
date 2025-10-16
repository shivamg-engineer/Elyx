// Exercise 3: Using Union Types


// TODO:

// Create a function that accepts either a string or a number and returns a formatted string.

let inputs: string|number;
function sayHello(inputs:string|number):string{
return `Input is ${inputs}`;
}

inputs=29;
console.log(inputs);