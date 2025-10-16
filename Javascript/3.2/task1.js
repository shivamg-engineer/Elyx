const numbers = [1, 2, 3, 4, 5,34,32];

const squares = numbers.map((num) => num * num);

const filtered=squares.filter((num)=>num<=10);
const sum=filtered.reduce((acc,num)=> acc+num,0);

const   formatted = `${sum}`;

console.log(squares);
console.log(filtered);
console.log(sum);
console.log(formatted);
console.log(typeof formatted);
