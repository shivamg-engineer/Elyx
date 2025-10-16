// Exercise 2: Understanding unknown


// TODO:

// Write a function that accepts an unknown parameter and safely processes it.

let input: unknown;
function greet(name:unknown):void{
if(typeof input === "string"){
    console.log(`hello ${name}`); 
}else{
    console.log(`hello`); 
}
}
// input="ashish";
input=4;
greet(input);