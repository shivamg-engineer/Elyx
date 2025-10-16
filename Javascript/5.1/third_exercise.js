// Exercise 3: Iterating Over Objects

// Create an object representing a product catalog.
// Use for...in to list all keys.
// Use Object.keys() to get an array of keys.
// Use Object.entries() to print key-value pairs.

const productCatalog = {
  laptop: 999.99,
  smartphone: 699.49,
  headphones: 199.99,
  keyboard: 89.99
};

for(let key in productCatalog){
    console.log(`${key}:${productCatalog[key]}`);
}

console.log("🔁 Using for...in loop to list all keys:");
for (let key in productCatalog) {
  console.log(key); // prints each product name
}

console.log("\n📋 Using Object.keys() to get an array of keys:");
const keys = Object.keys(productCatalog);
console.log(keys);

console.log("\n📦 Using Object.entries() to print key-value pairs:");
const entries=Object.entries(productCatalog);
for(let [product, price] of entries){
     console.log(`${product}: $${price}`);
}