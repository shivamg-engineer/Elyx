// Create a generic function that swaps two values.

function swap<T,U>(a:T, b:U):[U,T]{
return [b,a];
}
const result1 = swap("hello", 42); 
console.log(result1);