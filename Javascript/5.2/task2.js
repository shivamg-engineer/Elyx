// 2. Transforming Arrays with map(), find(), some(), every()

// Task: Use transformation methods for data filtering and modification.

let scores=[43,22,64,11,75,55];

let grades=scores.map((score)=>score>=75 ? "A":"B");
let firstPassing= scores.find(score=> score>60);
let hasPassed=scores.some(score=> score>=60);
let allPassed=  scores.every(score=>score>=60);

console.log(grades);
console.log(firstPassing);
console.log(hasPassed);
console.log(allPassed);