//     10. Create a Function That Accepts a Callback
// Write a function applyOperation that takes two numbers and a callback function to perform an operation (addition, multiplication, etc.).

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a ,b) {
  return a /b;
}
function applyOperation(a,b,op){
switch(op){
    case add:
        return add(a,b);
        break;
    case sub:
        return sub(a,b);
        break;
    case mul:
        return mul(a,b);
        break;
    case div:
       return div(a,b);
        break;
}
}
console.log(applyOperation(10, 5, add)); // 15
console.log(applyOperation(10, 5, (x, y) => x * y)); // 50
