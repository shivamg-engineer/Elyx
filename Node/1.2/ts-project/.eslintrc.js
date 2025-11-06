module.exports = {
  env: {
    browser: true, // or 'node' if your project runs in Node.js
    es2021: true,
  },
  parser: '@typescript-eslint/parser', // Parse TypeScript files
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', 
    'prettier', // 👈 This disables ESLint rules that conflict with Prettier
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'consistent-return':'error',
    'prettier/prettier': ['error'], // 👈 Makes Prettier formatting issues show up in ESLint
    'quotes': ['error', 'single'],  // Example custom rule
    'semi': ['error', 'never'],
  },
}
