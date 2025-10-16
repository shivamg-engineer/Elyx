console.log(namedFunction());
console.log(unknown());
function namedFunction(){
    return "named function called!"
}

const unknown=()=>"anonymous function called!";


// A named function has a declared name and can be called before its definition due to hoisting.
// An anonymous function has no name and must be assigned to a variable. It cannot be called before its definitio