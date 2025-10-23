class Product {

    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    discount(percent: number): void {
        if (percent < 0 || percent > 100) {
            console.log("Invalid discount percentage.");
            return;
        }
        const discountAmount = (this.price * percent) / 100;
        this.price -= discountAmount;
        console.log(
            `Applied ${percent}% discount. Discounted price: ₹${this.price.toFixed(2)}`
        );

    }
    displayInfo(): void {
        console.log(`Product: ${this.name}, Price: ₹${this.price.toFixed(2)}`);
    }

}

const laptop = new Product("Laptop", 50000);
laptop.displayInfo();

laptop.discount(10);
laptop.displayInfo();

laptop.discount(150); // invalid example