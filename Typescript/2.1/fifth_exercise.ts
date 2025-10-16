// Exercise 5: Function Parameter Type Safety


// TODO:

// Write a function that enforces type safety on an array of numbers.

function sumNumbers(numbers :number[]):number{
    return numbers.reduce((total,num)=> total+num,0);

}
const myNumbers = [1, 2, 3, 4, 5];
console.log(sumNumbers(myNumbers)); // Output: 15