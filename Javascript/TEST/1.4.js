function isPowerOfFour(n) {
    if (n <= 0) return false; // 0 or negative can't be power of 4

    while (n % 4 === 0) {
        n = n / 4;
    }

    return n === 1;
}

function alternate(n){
return n>0 && (n&(n-1))==0 && (n-1)%3==0
}
console.log(alternate(65));
console.log(alternate(64));

// Test
console.log(isPowerOfFour(16)); // true
console.log(isPowerOfFour(64)); // true
console.log(isPowerOfFour(12)); // false
console.log(isPowerOfFour(1));  // true