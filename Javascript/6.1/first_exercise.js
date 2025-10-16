// Exercise 1: Event Loop Order

// Predict the output of the following code and verify by running it.

console.log("A");
setTimeout(()=> console.log("B"),1000);
Promise.resolve().then(()=>console.log("C"));
console.log("D");

// A
// C
// B
// D