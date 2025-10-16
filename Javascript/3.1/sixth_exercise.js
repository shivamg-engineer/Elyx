function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}




function mathOperation(a,b,operation){
switch(operation){
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
console.log(mathOperation(19,5,add));
console.log(mathOperation(19,5,sub));
console.log(mathOperation(19,5,mul));
console.log(mathOperation(19,5,div));