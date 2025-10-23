class Product {
    name:string;
    price:number;
    category:string;
    constructor(name:string, price:number,category:string) {
           this.name = name;
        this.price = price;
        this.category=category;

    }

    display() {
        console.log(`Product: ${this.name}, Price: ₹${this.price}`);
    }
}

const item = new Product("Laptop", 75000,"something");
item.display();
