namespace App {
    export namespace Utils {
        export function formatDate(date: Date): string {
            return date.toISOString();
        }

        export function formatNumber(num:number, decimals:number=2):string{
            return num.toFixed(decimals);
        }
    }


}

console.log(App.Utils.formatDate(new Date()));
console.log(App.Utils.formatNumber(1234.5678));        // "1234.57"
console.log(App.Utils.formatNumber(1234.5678, 1)); 