import greet from "./greet";

const singleGreeting = greet("World!!");
console.log(singleGreeting); // Hello, World

const multipleGreetings = greet(["Alice", "Bob", "Charlie"]);
console.log(multipleGreetings);