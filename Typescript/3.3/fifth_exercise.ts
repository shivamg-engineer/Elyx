// Create a utility function that checks if a given object is an instance of a specific class.
class Car {
  constructor(public name: string, public price: number) {}
}

function utility<T>(obj: unknown, cls: new (...args: any[]) => T): obj is T {
  return obj instanceof cls;
}

const myCar = new Car("Toyota", 20000);
const notACar = { name: "Bike", price: 1000 };

console.log(utility(myCar, Car));   // true
console.log(utility(notACar, Car)); // false
