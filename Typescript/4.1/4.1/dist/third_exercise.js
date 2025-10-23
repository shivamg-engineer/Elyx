"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    discount(percent) {
        if (percent < 0 || percent > 100) {
            console.log("Invalid discount percentage.");
            return;
        }
        const discountAmount = (this.price * percent) / 100;
        this.price -= discountAmount;
        console.log(`Applied ${percent}% discount. Discounted price: ₹${this.price.toFixed(2)}`);
    }
    displayInfo() {
        console.log(`Product: ${this.name}, Price: ₹${this.price.toFixed(2)}`);
    }
}
const laptop = new Product("Laptop", 50000);
laptop.displayInfo();
laptop.discount(10);
laptop.displayInfo();
laptop.discount(150); // invalid example
//# sourceMappingURL=third_exercise.js.map