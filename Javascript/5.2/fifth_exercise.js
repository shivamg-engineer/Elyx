// Exercise 5: Complex Data Transformation

// Create an array of prices.
// Use map() to add a 10% discount to each price.
// Filter out discounted prices below 50.
// Print the final array.

const prices = [120, 75, 60, 40, 30, 90];

const   discountedPrice=prices.map(price=>price*0.9);

const finalPrices=discountedPrice.filter(price=>price>=50);
console.log("Discounted prices (>= $50):", finalPrices);