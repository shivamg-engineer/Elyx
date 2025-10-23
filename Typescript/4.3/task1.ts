class Utility{
    static PI:number= 3.14;

    static circleArea(radius:number):number{
  return this.PI * radius * radius;
    }
}

console.log(Utility.PI); // Accessing static property
console.log(Utility.circleArea(5)); // Calling static method
