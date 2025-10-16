// Create a utility function that checks if a given object is an instance of a specific class.
var Car = /** @class */ (function () {
    function Car(name, price) {
        this.name = name;
        this.price = price;
    }
    return Car;
}());
function utility(obj, cls) {
    return obj instanceof cls;
}
var myCar = new Car("Toyota", 20000);
var notACar = { name: "Bike", price: 1000 };
console.log(utility(myCar, Car)); // true
console.log(utility(notACar, Car)); // false
