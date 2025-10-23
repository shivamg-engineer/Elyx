interface IShape{
    color:string;
    calculateArea():number;
}

class Rectangle implements IShape{
      constructor(public color: string, public width: number, public height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }

}

const myRectangle = new Rectangle("blue", 5, 10);
console.log(`Rectangle Area: ${myRectangle.calculateArea()}`);
