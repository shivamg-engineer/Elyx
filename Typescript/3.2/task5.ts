function sortArray<T>(arr: T[], compareFn: (a:T, b:T)=>number):T[]{
    return arr.sort(compareFn);
}
const numbers = [5, 2, 8, 3];
console.log(sortArray(numbers, (a, b) => a - b));