const person = { name: "Alice", age: 25, city: "New York" };

// Loop using for...in
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}
console.log(person[name]);

// Loop using Object.entries()
// Object.entries(person).forEach(([key, value]) => {
//   console.log(`${key}: ${value}`);
// });
