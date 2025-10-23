var Singleton = /** @class */ (function () {
    function Singleton() {
        console.log("instance method");
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    return Singleton;
}());
var obj1 = Singleton.getInstance();
var obj2 = Singleton.getInstance();
console.log(obj1 === obj2); // true (same instance)
