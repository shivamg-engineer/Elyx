function identity<T>(arg:T){
    return arg;
}

console.log(identity<string>("hello"));
console.log(identity<number>(33));

// Challenge:

// Modify the identity function to accept an array and return the first element.

function identity1<T>(arg:T[]){
    return arg[0];
}
const firstNumber = identity1<number>([1, 2, 3]);
const firstString = identity1<string>(["a", "b"]);  // firstString: string ("a")

console.log(firstNumber,firstString);