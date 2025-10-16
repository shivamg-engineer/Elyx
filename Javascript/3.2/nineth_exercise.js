// 9. Implement forEach() Instead of map()
// Given an array of numbers, implement a version of map() using forEach().

const numbers = [1, 2, 3, 4];

numbers.forEach((element,i) => {
    numbers[i]= element*2;
    // console.log(element*2);
});

console.log(numbers);