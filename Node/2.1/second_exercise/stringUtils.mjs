import { error } from "console";

export function capitalizer(str) {
  if (typeof str != "string") {
    throw new Error("Expexted a string");
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export function reverser(str) {
     if (typeof str != "string") {
    throw new Error("Expexted a string");
  }
  return str.split('').reverse().join('');
}
