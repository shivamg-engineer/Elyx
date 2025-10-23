var Cache1 = /** @class */ (function () {
    function Cache1() {
    }
    Cache1.set = function (key, value) {
        Cache1.cache[key] = value;
    };
    Cache1.get = function (key) {
        return Cache1.cache[key];
    };
    Cache1.delete = function (key) {
        delete Cache1.cache[key];
    };
    Cache1.clear = function () {
        Cache1.cache = {};
    };
    Cache1.cache = {};
    return Cache1;
}());
//adding
Cache1.set("shivam", "e029");
Cache1.set("sandeep", "e026");
//consoling
console.log(Cache1.get("shivam"));
console.log(Cache1.get("sandeep"));
//deleing sandeep
Cache1.delete("sandeep");
console.log(Cache1.get("sandeep")); //trying to console deleted data
//clearing
Cache1.clear();
//consoling after clearing Cache
console.log(Cache1.get("sandeep"));
console.log(Cache1.get("shivam"));
