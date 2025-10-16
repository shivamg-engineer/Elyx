const user = {
  name: "John Doe",
  age: 30,
};

console.log(user.name); // TypeScript infers `string`
console.log(user.age); // TypeScript infers `number`
