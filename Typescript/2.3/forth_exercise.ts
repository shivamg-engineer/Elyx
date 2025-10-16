// Write an arrow function filterEvenNumbers(numbers: number[]): number[] to return only even numbers.

const filterEvenNumbers = (numbers: number[]): number[]=>{
 return numbers.filter(num => num % 2 === 0);   
};


const result= filterEvenNumbers([1,2,3,4,5,6]);
console.log(result);