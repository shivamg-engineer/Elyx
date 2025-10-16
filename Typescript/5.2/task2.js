var App;
(function (App) {
    var Utils;
    (function (Utils) {
        function formatDate(date) {
            return date.toISOString();
        }
        Utils.formatDate = formatDate;
        function formatNumber(num, decimals) {
            if (decimals === void 0) { decimals = 2; }
            return num.toFixed(decimals);
        }
        Utils.formatNumber = formatNumber;
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
console.log(App.Utils.formatDate(new Date()));
console.log(App.Utils.formatNumber(1234.5678)); // "1234.57"
console.log(App.Utils.formatNumber(1234.5678, 1));
