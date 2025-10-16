const user = { name: "Alice", age: 25, job: "Developer" };
const { name, age } = user; // Extracts `name` and `age`
console.log(name, age); // "Alice", 25


const person = { name: "Alice", age: 25 };

// Iterate over keys
Object.keys(person).forEach(key => console.log(key)); // "name", "age"

// Iterate over key-value pairs
Object.entries(person).forEach(([key, value]) => {
  console.log(key, value); // "name Alice", "age 25"
});

console.log(person.hasOwnProperty("age"));