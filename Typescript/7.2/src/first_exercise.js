var User = /** @class */ (function () {
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    User.prototype.getAge = function () {
        return this.age;
    };
    return User;
}());
var user = new User("Alice", 25); // Error!
console.log(user.getAge());
