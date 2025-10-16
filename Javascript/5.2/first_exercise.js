// Exercise 1: Basic Array Manipulation

// Create an array of 5 numbers.
// Remove the second element using splice().
// Insert a new number at index 3.
// Print the final array.

const arr=[45,2,24,76,46];
console.log(arr);


arr.splice(1,1);

console.log("after splice");
console.log(arr);

arr.splice(3,0,66);
console.log("after Insert a new number at index 3. "+arr);