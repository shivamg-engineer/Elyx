
// Destructuring
const person={name: 'john',age:22};

console.log(person);
const{name,age}=person;
console.log(name,age);

const arr=[3,443,34,22];
arr.unshift(34);
console.log(arr);
const [first,second , , fourth]=arr;

console.log(first,second,fourth);

//Using Floating Point Numbers for Precise Calculations
// Avoid
console.log(0.1 + 0.2 === 0.3);  // false, due to floating-point precision issues

// Correct
console.log((0.1 + 0.2).toFixed(1) === '0.3');  // true, after rounding
