// 5. Chain map(), filter(), and reduce() Together


// Given an array of numbers, perform the following operations:

// Square each number using map().
// Filter out numbers greater than 50 using filter().
// Find the sum of the remaining numbers using reduce().

const numbers = [2, 5, 8, 10, 12];
const square= numbers.map((num)=>num*num);
const filtered = square .filter((num) => num>50); 
const sum=filtered.reduce((total,num)=>total+num,0);


console.log(square);
console.log(filtered);
console.log(sum);