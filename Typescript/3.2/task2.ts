interface Box<T>{
    value:T;
}

const numberBox: Box<number> = {value:100};
const stringBox: Box<string> = {value:"Typescript"};

console.log(numberBox,stringBox);

// Challenge:

// Create a generic interface Pair<T, U> that holds two values of different types.

interface Pair<T,U>{
    first:T,
    second:U
}
const numberStringPair: Pair<number, string> = {
    first: 42,
    second: "Answer"
};

const booleanDatePair: Pair<boolean, Date> = {
    first: true,
    second: new Date()
};

const newPair:Pair<string,number>={first:"Alice",second:33}
console.log(newPair);