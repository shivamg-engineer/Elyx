function greetUser(user: { name: string }) {
  console.log(`Hello, ${user.name}!`);
}
greetUser({ name: "Alice" });
