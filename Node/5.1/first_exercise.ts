// Product Management API

// Create RESTful endpoints for /products with all CRUD operations.

// TODO: Implement validation for product name, price, and category.

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

let products: Product[] = [];
let nextId = 1;

//Validation logic
const validateProduct = (product: Partial<Product>): string | null => {
  if (!product.name || product.name.trim() === "") {
    return "Name is required";
  }
  if (product.price === undefined || product.price < 0)
    return "Price must be a positive number";
  if (!product.category || product.category.trim() === "")
    return "Category is required";
  return null;
};

//create Product
app.post("/products", (req: Request, res: Response) => {
  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  const newProduct: Product = { id: nextId++, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//read all products
app.get("/products", (req: Request, res: Response) => {
  if (!products) return res.status(404).json({ error: "Product not found" });
  res.json(products);
});
//read products
app.get("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

//update product
app.put("/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id == Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Products not found" });

  const error = validateProduct(req.body);
  if (error) return res.status(400).json({ error });

  //   product.name = req.body.name;
  // product.price = req.body.price;
  // product.category = req.body.category;
  //or
  Object.assign(product, req.body);
  res.json(product);
});

//delete product
app.delete("/products/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
  res.status(204).send();
});

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Product API is running!");
});

// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`Product API running at http://localhost:${port}`);
});