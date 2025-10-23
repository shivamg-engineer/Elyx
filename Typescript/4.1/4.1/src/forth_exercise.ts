// Use getters and setters to safely manipulate object properties.

class Product {
    name: string;
    price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price
    }

    getName() {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;

    }
    getPrice() {
        return this.price;

    }
    setPrice(price: number): void {
        this.price = price;
    }

}

const mobile1=new Product("Oppo A15",14499);
mobile1.setPrice(14000);
mobile1.setName("Oppo A15s");
console.log(mobile1);