abstract class Polygon{

    abstract getPerimeter(...sides: number[]): number;
}
 class Triangle extends Polygon{
    getPerimeter(firstSide:number,secondSide:number,thirdSide:number): number {
        return firstSide+secondSide+thirdSide;
    }
 }