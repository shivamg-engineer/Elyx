import greet from "./greet.ts";

const singleGreeting = greet("World!!");
console.log(singleGreeting); // Hello, World

const multipleGreetings = greet(["Alice", "Bob", "Charlie"]);
console.log(multipleGreetings);