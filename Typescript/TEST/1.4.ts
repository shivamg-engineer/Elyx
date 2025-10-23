function isPowerOfFour1(n:number):boolean {
    if (n <= 0) return false; // 0 or negative can't be power of 4

    while (n % 4 === 0) {
        n = n / 4;
    }

    return n === 1;
}

function alternate1(n:number):boolean{
return n>0 && (n&(n-1))==0 && (n-1)%3==0
}
console.log(alternate1(65));
console.log(alternate1(64));

// Test
console.log(isPowerOfFour1(16)); // true
console.log(isPowerOfFour1(64)); // true
console.log(isPowerOfFour1(12)); // false
console.log(isPowerOfFour1(1));  // true