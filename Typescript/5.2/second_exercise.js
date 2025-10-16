// Exercise 2: Implement a Date Helper Namespace
// TODO: Create a DateHelper namespace that includes functions for getting today’s date and formatting dates.
var DateHelper;
(function (DateHelper) {
    function getToday() {
        return new Date();
    }
    DateHelper.getToday = getToday;
    function formatDate(date, locale) {
        if (locale === void 0) { locale = 'en-US'; }
        return date.toLocaleDateString(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    DateHelper.formatDate = formatDate;
})(DateHelper || (DateHelper = {}));
var today = DateHelper.getToday();
console.log("Today's Date Object:", today);
console.log("Formatted Date:", DateHelper.formatDate(today)); // e.g. October 14, 2025
console.log("Formatted (UK):", DateHelper.formatDate(today, 'en-GB')); // e.g. 14 October 2025
