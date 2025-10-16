// Exercise 4: Tuple-Based Color Palette

// TODO: Create a tuple type to represent a color in [red, green, blue] format.

type RGBColor=[number,number,number];

const white: RGBColor = [255, 255, 255];
const black: RGBColor = [0, 0, 0];
const skyBlue: RGBColor = [135, 206, 235];

function printColor(color:RGBColor):string{
    return `RGB(${color[0]}, ${color[1]}, ${color[2]})`;

}

console.log(printColor(skyBlue)); // RGB(135, 206, 235)