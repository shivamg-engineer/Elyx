// ---------------- js----

// function add(a, b) {
//     return a + b;
// }
// console.log(add(5, '10')); // Output: "510"

// --------- ts
function add(a:number, b:number) :number{
    return a + b;
}
console.log(add(5, 10)); // Output: "510"


let data:any="this could be anything";
data=42;
let value: unknown = "This could be anything";
value = 42;

console.log(data, value);

let data1: any;

data1 = 123;
data1 = "hello";
// data1 = { x: true };

// You can access anything without error
data1.toUpperCase();  // ✅ No error, even if it's not a string
// data1.foo.bar();  
console.log(data1.toUpperCase() );