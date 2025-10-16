// Exercise 4: Write a Function Using Union Types

// Write a function formatId that accepts either a number or a string as an argument and returns a formatted string.

function formatId(id: number | string): string {
   // Implement logic here
   return `ID: ${id}`

}   

console.log(formatId(123));        // Output: ID: 123
console.log(formatId("abc123"));   // Output: ID: abc123
