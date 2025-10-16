
// 1. Writing Your First JavaScript Function
function greet() {
  console.log("Welcome to JavaScript!");
}
greet();

// 2. Understanding Variables and Data Types
// let : can be updated but cannot redeclared
// const: cannot be updated nor redeclared
// var : can be updated and  redeclared

console.log("-------var ------");
console.log(a); //undefined
var a=10;
console.log(a);//10

var a=5;
console.log(a);

console.log("-------let ------");
// console.log(b); //ReferenceError: Cannot access 'b' before initialization
let b="Shyam";
console.log(b);//shyam
// let b="ram";
b="ram";

console.log("----- const ------");
// console.log(c); //ReferenceError: Cannot access 'c' before initialization
const c="something";
console.log(c); // something




// ----------------
var a= Math.floor(Math.random()*10)+1;
console.log(a);