import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, prettier },
    extends: ['js/recommended', prettierConfig],
    languageOptions: { globals: globals.browser },
  },

  tseslint.configs.recommended,

  {
    rules: {
      // 🟢 Variables & functions must be camelCase
      '@typescript-eslint/naming-convetion': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase'],
        },
        // 🟢 Constants must be UPPER_CASE
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['UPPER_CASE'],
        },
        // 🟢 Classes must be PascalCase
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        // 🟢 Interfaces must start with "I"
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        // 🟢 Enums must be PascalCase
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
      ],
    },
  },
]);
