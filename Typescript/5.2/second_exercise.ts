// Exercise 2: Implement a Date Helper Namespace

// TODO: Create a DateHelper namespace that includes functions for getting today’s date and formatting dates.

namespace DateHelper{

    export function getToday(): Date{
        return new Date();
    }
     export function formatDate(date: Date, locale: string = 'en-US'): string {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

const today = DateHelper.getToday();
console.log("Today's Date Object:", today);
console.log("Formatted Date:", DateHelper.formatDate(today));        // e.g. October 14, 2025
console.log("Formatted (UK):", DateHelper.formatDate(today, 'en-GB')); // e.g. 14 October 2025