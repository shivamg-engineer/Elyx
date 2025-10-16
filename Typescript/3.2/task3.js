// class DataStorage<T>{
//     private items: T[]=[];
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//     addItem(item:T){
//        this.items.push(item);
//     }
//     removeItem(item:T){
//     this.items= this.items.filter((i)=>i != item);
//     }
//     getItems():T[]{
//       return [...this.items];
//     }
// }
// const numberStorage= new DataStorage<number>();
// numberStorage.addItem(34);
// numberStorage.addItem(44);
// console.log(numberStorage.getItems());
// Challenge:
// Modify the DataStorage class to support objects while preserving type safety.
var DataStorage = /** @class */ (function () {
    function DataStorage(identifierKey) {
        this.identifierKey = identifierKey;
        this.items = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.items.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        var _this = this;
        this.items = this.items.filter(function (i) { return i[_this.identifierKey] !== item[_this.identifierKey]; });
    };
    DataStorage.prototype.getItems = function () {
        return __spreadArray([], this.items, true);
    };
    return DataStorage;
}());
var userStorage = new DataStorage('id');
userStorage.addItem({ id: 1, name: "Alice" });
userStorage.addItem({ id: 2, name: "Bob" });
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
userStorage.removeItem({ id: 1, name: "Alice" });
console.log(userStorage.getItems()); // [{ id: 2, name: "Bob" }]
