// Higher-order functions
// Example – Function Returning Function:

function multiplier(factor){
return function(number){
    return number * factor;
}
}
const double    =  multiplier(2);
console.log(double(4));
console.log(double(5));


//------------------------ . Use Arrow Functions for Simple Callbacks
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2); // Arrow function for simple transformation
console.log(doubled);


//-------------------Avoid Overuse of Anonymous Functions
// Named function for clarity
function square(num) {
  return num * num;
}
const nums = [1, 2, 3];
const squaredNumbers = nums.map(square); // Uses a named function
console.log(squaredNumbers);

// 5. Overusing Anonymous Functions
console.log("---------5. Overusing Anonymous Functions");
setTimeout(function(){
    console.log("hello after 1 second");
},1000);

const logMessage = function(){
    console.log("Hello after 2 sec");
};
setTimeout(logMessage,2000);


