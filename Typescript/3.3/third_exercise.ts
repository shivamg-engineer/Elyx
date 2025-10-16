interface Circle{
    kind:"circle";
    radius:number;
}

interface Square{
    kind:"square";
    sideLength:number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

function area(shape: Shape): number {
     if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.kind === "square") {
    return shape.sideLength ** 2;
  } else if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  } else {
    // Should never happen if all cases covered
    throw new Error("Unknown shape!");
  }
}

const myCircle: Circle = { kind: "circle", radius: 5 };
const mySquare: Square = { kind: "square", sideLength: 10 };
const myRectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

console.log(area(myCircle));    // Output: 78.53981633974483
console.log(area(mySquare));    // Output: 100
console.log(area(myRectangle)); // Output: 24