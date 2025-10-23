abstract class Shape{
    constructor(public color:string){}

      abstract calculateArea(r:number): number;
       describe(): void {
        console.log(`This shape is ${this.color}.`);
    }

}

class Circle extends Shape{
      calculateArea(r:number): number{
     return 3.14*r*r;
      }
      describe(): void {
        console.log(`This shape is ${this.color}.`);
    }
      
}

const circle = new Circle("red");
circle.describe(); // Output: This shape is red.
console.log(circle.calculateArea(5)); // Output: 78.53981633974483