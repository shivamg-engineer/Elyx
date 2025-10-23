"use strict";
// Use getters and setters to safely manipulate object properties.
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
}
const mobile1 = new Product("Oppo A15", 14499);
mobile1.setPrice(14000);
mobile1.setName("Oppo A15s");
console.log(mobile1);
//# sourceMappingURL=forth_exercise.js.map