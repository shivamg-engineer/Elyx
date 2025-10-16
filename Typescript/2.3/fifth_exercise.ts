// Enhance calculateTax() to return an object { amount: number, tax: number, total: number }.
function calculateTax(amount: number, rate?: number): { amount: number; tax: number; total: number };
function calculateTax(amount: number, category: "standard" | "luxury"): { amount: number; tax: number; total: number };


//Implementation
function calculateTax(
amount:number,
param?: number | "standard" | "luxury"
):{ amount:number; tax:number;total:number}{ //(parameters): returnType => { function body }

    const taxRate=typeof param === "number"
    ? param : param ==="luxury" ? 0.2 : 0.1;

    const tax=amount*taxRate;
    const total= amount+tax;

return {  amount,   tax, total };
}


console.log(calculateTax(1000, 0.15));
// Output: { amount: 1000, tax: 150, total: 1150 }

console.log(calculateTax(2000, "luxury"));
// Output: { amount: 2000, tax: 400, total: 2400 }

console.log(calculateTax(500, "standard"));
// Output: { amount: 500, tax: 50, total: 550 }
