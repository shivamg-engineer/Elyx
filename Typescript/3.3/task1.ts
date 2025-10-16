//Challenge: Extend the function to handle boolean values.


function printValue(value: string | number | boolean) {
    if (typeof value === "string") {
        console.log("String value:", value.toUpperCase());
    } else if (typeof value === "number") {
        console.log("Numeric value:", value.toFixed(2));
    } else if (typeof value === "boolean") {
        console.log("Boolean value:", value ? "TRUE" : "FALSE");
    } else {
        console.log("Unknown type");
    }

}