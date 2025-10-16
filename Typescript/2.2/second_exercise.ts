// Exercise 2: Create a Readonly Product Catalog

// TODO: Implement a Product type where id is readonly and price is mandatory.

type Product={
    readonly id:number,
    price: number,
    name?:string
}


// Usage:
const product: Product = {
  id: 1,
  price: 29.99,
  name: "T-shirt"
};

// product.id = 2; //  Error: Cannot assign to 'id' because it is a read-only property.

console.log(product);