var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DataStorage1 = /** @class */ (function () {
    function DataStorage1(identifierKey) {
        this.identifierKey = identifierKey;
        this.items = [];
    }
    DataStorage1.prototype.addItem = function (item) {
        this.items.push(item);
    };
    DataStorage1.prototype.removeItem = function (item) {
        var _this = this;
        this.items = this.items.filter(function (i) { return i[_this.identifierKey] !== item[_this.identifierKey]; });
    };
    DataStorage1.prototype.getItems = function () {
        return __spreadArray([], this.items, true);
    };
    // ✅ New method to return the last item
    DataStorage1.prototype.getLastItem = function () {
        return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
    };
    return DataStorage1;
}());
var storage = new DataStorage1('id');
storage.addItem({ id: 1, name: "Alice" });
storage.addItem({ id: 2, name: "Bob" });
console.log(storage.getLastItem());
