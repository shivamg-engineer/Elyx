function calculateTax(amount:number, rate?:number):number;
function calculateTax(amount:number, category: "standard" | "luxury"):number;
function calculateTax(amount: number, param?: number | "standard" | "luxury"): number {
  let taxRate = typeof param === "number"
    ? param                // If param is a number, use it directly
    : param === "luxury"
      ? 0.2                // If category is "luxury", 20% tax
      : 0.1;               // Otherwise (e.g., "standard" or undefined), 10% tax

  return amount * taxRate;
}


console.log(calculateTax(1000,0.15));
console.log(calculateTax(1000,"luxury"));