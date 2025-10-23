// Define an interface Vehicle with brand, speed, and accelerate().
// Implement a Car class that adheres to the Vehicle interface.
// Demonstrate object instantiation and acceleration.

interface Vehicle {
    brand: string;
    speed: number;
    accelerate(): void;
}


class Car implements Vehicle{
     brand: string;
    speed: number;

   constructor(brand: string, speed: number) {
        this.brand = brand;
        this.speed = speed;
    }

    accelerate(): void {
        this.speed += 10;
        console.log(`${this.brand} is accelerating. New speed: ${this.speed} km/h`);
    }
}

// Usage example
const myCar = new Car("Toyota", 50);
myCar.accelerate(); // Toyota is accelerating. New speed: 60 km/h