// Implement a function that differentiates between string, number, and boolean types.

function identifyType(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log("It's a string:", value);
  } else if (typeof value === "number") {
    console.log("It's a number:", value);
  } else if (typeof value === "boolean") {
    console.log("It's a boolean:", value);
  } else {
    console.log("Unknown type");
  }
}
identifyType("hello");  // It's a string: hello
identifyType(42);       // It's a number: 42
identifyType(true);     // It's a boolean: true
