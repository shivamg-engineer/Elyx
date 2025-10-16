// Capitalizes the first letter
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reverses a string
export function reverseString(str) {
  return str.split('').reverse().join('');
}