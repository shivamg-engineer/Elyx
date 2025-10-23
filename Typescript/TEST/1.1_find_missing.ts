// Problem Statement:
// A mathematical equation is given in the form of a string with one missing digit (?). Your task is to find the missing digit.
// Example Input:
// "4? + 12 = 54"
// Expected Output:
// "48 + 12 = 54 → Missing Digit: 8"________________________________________

function findMissingDigit1(equation: string): void {
    for (let d = 0; d <= 9; d++) {
        let testEq = equation.replace("?", d.toString());

        let [left, right] = testEq.split("=");

        if (eval(left.trim()) === eval(right.trim())) {
            console.log(`${equation} Missing digit: ${d}`);
            return;
        }


    }
    console.log("not found");
}

findMissingDigit1("4? + 12 = 54");