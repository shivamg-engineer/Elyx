// Implement Product, Cart, and Customer classes.
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    getInfo() {
        return `${this.name} : ${this.price}`;
    }
}


//----------------------cart -----------------------
class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        this.items.push(product);
    }

    removeProduct(productName) {
        this.items = this.items.filter((product) => productName != product);
    }

    getTotal() {
        return this.items.reduce((total, product) => total += product.price, 0);
    }
    listItems() {
        return this.items.map(p => p.getInfo()).join("\n");
    }
}


// ------------------Customer------------
class Customer {
    constructor(name) {
        this.name = name;
        this.cart = new Cart();
    }
    viewCart() {
        console.log(`Cart for ${this.name}:\n${this.cart.listItems()}`);
    }

    checkout() {
        console.log(`Total amount due: $${this.cart.getTotal()}`);
    }
}



// Implement method overriding and dynamic method addition.
class specialProduct extends Product {
    constructor(name, price, discount) {
        super(name, price);
        this.discount = discount;
    }

    getInfo() {
        const discountedPrice = this.price - this.discount;
        return `${this.price} is on sale for $${discountedPrice}! (original: $${this.price})`;
    }
}
// ----------------- Dynamic Method Addition-------------------
Customer.prototype.applyPromo = function (code) {
    if (code === "OCT10") {
        console.log(`${this.name} gets $10 off!`);
        const originalTotal = this.cart.getTotal();
        const newTotal = Math.max(0, originalTotal - 10);
        console.log(`New total: $${newTotal}`);
    } else {
        console.log("Invalid promo code");
    }
}

// ----------------------- test -------------------------------
const customer = new Customer("Alice");
customer.cart.addProduct(new Product("Book", 20));
console.log(customer.cart.listItems());
customer.applyPromo("OCT10");

// console.log(Object.getPrototypeOf(Product)); // [Function]
// console.log(Product.prototype); // methods live here
// console.log(Object.getOwnPropertyNames(Product.prototype));
