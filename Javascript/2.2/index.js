

// 1. Exploring Basic Arithmetic Operators
let sum = 10 + 5; // 15
let greeting = "Hello" + " " + "World!"; // "Hello World!"
let difference = 10 - 5; // 5
let product = 10 * 5; // 50
let quotient = 10 / 5; // 2
let remainder = 10 % 3; // 1


// 2. Understanding the Nullish Coalescing Operator (??)
let user;
let defaultUser = "Guest";
let currentUser = user ?? defaultUser; // "Guest"
console.log(currentUser);

// 3. Utilizing the Optional Chaining Operator (?.)
let user1 = {};
console.log(user1.address?.street); // undefined

// 4. Mastering Template Literals
// Task: Create dynamic strings using template literals.

let name = "Alice";
let message = `Hello, ${name}!`; // "Hello, Alice!"
console.log(message);


// 1. Use Strict Equality (===) Instead of Loose Equality (==)
let userInput = '5';
if (userInput === 5) {  // Strict comparison (false)
  console.log("Equal");
}

// 2. Avoid Implicit Type Conversion
let value = '0';
if (value == false) {  // Loose equality (true)
  console.log("Loose equality problem!");
}
// Use strict comparison instead
if (value === false) {  // Strict equality (false)
  console.log("This won't be logged");
}

// 3. Use the Ternary Operator for Simple Conditionals
let age = 18;
let status = age >= 18 ? 'Adult' : 'Minor';  // Shorter and more readable
console.log(status);  // "Adult"


//4.Use && and || for short-Circuit evaluation
let isAuthenticated=true;
let hasPermission=false;
if(isAuthenticated && hasPermission){
    console.log("Access granted");
}else{
    console.log("Access denied");
}

// 6. Use typeof and instanceof for Type Checking
let x='Hello';
console.log(typeof x);

let person={name:'John'}
console.log(person instanceof Object);

// 8.use of spread operator and  Array Manipulation
let arr1=[1,2,3];
let arr2=[...arr1,4,5];
console.log(arr2);

let obj1= {name:'John'};
let obj2={...obj1,age:30};
console.log(obj2);

// 10. Use the delete Operator Sparingly
let person1 = { name: 'John', age: 30 };
delete person1.age;  // Delete the 'age' property
console.log(person1);  // { name: 'John' }


const person2={name:"John", age:22};
const {age:city}=person2;
console.log(city);


console.log(0 || 10);  // 10 (0 is falsy)
console.log(0 ?? 10);  // 0 (`??` does not consider `0` as falsy)
