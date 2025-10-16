// Implement a custom type guard function for checking if an object is an array.
    // Explanation:

// value: unknown: We accept any input, even when we don't know its type.

// value is any[]: This is the type guard part. It tells TypeScript:
// “If this function returns true, then you can treat value as an array.”
function isArray(value: unknown) : value is any[]{

    return Array.isArray(value);
}

function printLengthIfArray(value: unknown){
    if(isArray(value)){
         console.log("Array length:", value.length);
    }
    else {
    console.log("Not an array.");
  }
}

printLengthIfArray([1, 2, 3]); // Array length: 3
printLengthIfArray("hello");   // Not an array.