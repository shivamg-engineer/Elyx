var Rectangle = /** @class */ (function () {
    function Rectangle(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.calculateArea = function () {
        return this.width * this.height;
    };
    return Rectangle;
}());
var myRectangle = new Rectangle("blue", 5, 10);
console.log("Rectangle Area: ".concat(myRectangle.calculateArea()));
