"use strict";
//     Modify tsconfig.json settings
// TODO: Enable noImplicitAny and test its effect.
// function greet(name) {
//   return "Hello, " + name;
// }
/*  you'll get error
 second_exercise.ts:6:16 - error TS7006: Parameter 'name' implicitly has an 'any' type.

6 function greet(name) {
                  ~~~~


Found 1 error in second_exercise.ts:6 */
//fix it 
// export function greet(name: string): string {
//   return `Hello, ${name}!`;
// }
const greet = (name) => `Hello, ${name}`;
module.exports = greet;
//# sourceMappingURL=second_exercise.js.map