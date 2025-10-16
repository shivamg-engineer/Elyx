// Exercise 1: Convert JavaScript Code to TypeScript

// Convert the following JavaScript function to TypeScript by adding appropriate type annotations.

// function multiply(a, b) {
//     return a * b;
// }
// console.log(multiply(5, "10"));

function multiply(a:number, b:number): number {
    return a * b;
}
console.log(multiply(5, 10));
