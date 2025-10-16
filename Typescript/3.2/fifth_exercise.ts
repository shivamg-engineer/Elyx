// Refactor the sorting function to allow custom sorting orders.
function customSorting<T>(arr: T[], order: "asc" | "desc" = "asc", compareFn?: (a: T, b: T) => number):T[]{
 const defaultCompare = (a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

    const comparator = compareFn || defaultCompare;

    return arr.sort((a,b)=>{
        const result=comparator(a,b);
        return order === "asc" ? result : -result;
    })
}

const numbers2= [5, 2, 8, 1];

console.log(customSorting(numbers2, "asc"));  
console.log(customSorting(numbers2, "desc"));  


// Custom compare function (sort by remainder when divided by 3)
const customCompare = (a: number, b: number) => (a % 3) - (b % 3);

console.log(customSorting(numbers2, "asc", customCompare)); 
// Output sorted by remainder: [3%0=0, 6%0=0, etc.]