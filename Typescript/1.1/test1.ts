function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet("Alice"))    // ✅ OK
// greet(123);    
let name = "Alice";    // inferred as string
let age = 25;          // inferred as number
// name=12; can't
console.log(name);