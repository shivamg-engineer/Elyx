// Problem Statement:
// A mathematical equation is given in the form of a string with one missing digit (?). Your task is to find the missing digit.
// Example Input:
// "4? + 12 = 54"
// Expected Output:
// "48 + 12 = 54 → Missing Digit: 8"________________________________________
function findMissingDigit1(equation) {
    for (var d = 0; d <= 9; d++) {
        var testEq = equation.replace("?", d.toString());
        var _a = testEq.split("="), left = _a[0], right = _a[1];
        if (eval(left.trim()) === eval(right.trim())) {
            console.log("".concat(equation, " Missing digit: ").concat(d));
            return;
        }
    }
    console.log("not found");
}
findMissingDigit1("4? + 12 = 54");
