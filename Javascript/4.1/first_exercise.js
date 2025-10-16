// 1. Convert Procedural Code to OOP


// Task:

// Convert the following procedural function into an OOP-based class.
// Procedural Code:

// let carBrand = "Tesla";
// let carModel = "Model S";

// function startCar(brand, model) {
//   return `${brand} ${model} is starting...`;
// }

// console.log(startCar(carBrand, carModel));
// Requirements:

// Create a Car class with properties brand and model.
// Implement a start() method that outputs the starting message.

class Car {

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
    start(){
        return `${this.brand} ${this.model} is starting...`
    }

}

const myCar= new Car("Tesla","Psl");
console.log(myCar.start());