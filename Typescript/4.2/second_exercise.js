// Define an interface Vehicle with brand, speed, and accelerate().
// Implement a Car class that adheres to the Vehicle interface.
// Demonstrate object instantiation and acceleration.
var Car = /** @class */ (function () {
    function Car(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    Car.prototype.accelerate = function () {
        this.speed += 10;
        console.log("".concat(this.brand, " is accelerating. New speed: ").concat(this.speed, " km/h"));
    };
    return Car;
}());
// Usage example
var myCar = new Car("Toyota", 50);
myCar.accelerate(); // Toyota is accelerating. New speed: 60 km/h
