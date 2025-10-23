class Vehicle {
    brand:string;
    constructor(brand:string) {
        this.brand = brand;
    }

    start() {
        console.log(`${this.brand} vehicle is starting...`);
    }
}

class Car extends Vehicle {
    start() {
        console.log(`${this.brand} car is starting with a key!`);
    }
}
class Bike extends Vehicle {
    start() {
        console.log(`${this.brand} Bike is starting with a key!`);
    }
}

const myCar = new Car("Toyota");
myCar.start();
