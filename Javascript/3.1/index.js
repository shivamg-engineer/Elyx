function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

const number=[2,43,55,3];

console.log(sum(...number));

//----------------------------------------------------------------------------------------

const person = {
  name: "Alice",
  sayHello: function () {
    console.log(`Hello, my name is ${this.name}`);
  },
  sayHelloArrow: () => {
    console.log(`Hello, my name is ${this.name}`); // Undefined in arrow functions
  },
};

person.sayHello(); // Works: "Hello, my name is Alice"
person.sayHelloArrow(); // Undefined due to arrow function


console.log("---------------What is the difference between arguments and Rest Parameters (...args)?--------------------")
function showArgs() {
  console.log(arguments); // Works in regular functions
}
showArgs(1, 2, 3);

const showRest = (...args) => {
  console.log(args); // Works in arrow functions
};
showRest(1, 2, 3);

// -----------------------------------IIFE (Immediately invoked function expression)--------------
console.log("-----Syntax of an IIFE:---------");
(function (){
    console.log("normal function of IIFE is callled!, it says Arrow IIFE runs immediately!");
})();

(() => {
  console.log("arrow function of IIFE is callled!, Arrow IIFE runs immediately!");
})();


//
function printMessage(greeting = "Hello", ...names) {
  return `${greeting}, ${names.join(", ")}!`;
}
console.log(printMessage("Hi", "Alice", "Bob"));
