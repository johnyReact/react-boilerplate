import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react'; // React/JSX best practices
import reactHooks from 'eslint-plugin-react-hooks'; // Rules of Hooks + deps
import reactRefresh from 'eslint-plugin-react-refresh'; // Vite Fast Refresh safety
import jsxA11y from 'eslint-plugin-jsx-a11y'; // Accessibility rules
import importPlugin from 'eslint-plugin-import'; // Import/export hygiene
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Deterministic import ordering
import unusedImports from 'eslint-plugin-unused-imports'; // Remove dead imports/vars

export default tseslint.config(
  // 1) Ignore generated output and noisy folders (keeps lint fast + signal-only)
  { ignores: ['dist', 'build', 'coverage', '*.min.*'] },

  // 2) Base JS recommended rules (undef vars, unreachable code, etc.)
  js.configs.recommended,

  // 3) TypeScript recommended rules (syntax-level; no project/type-check required)
  ...tseslint.configs.recommended,

  // 4) App source (TS/TSX)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022, // Modern JS syntax support
      sourceType: 'module', // ESM import/export
      globals: globals.browser, // window/document/etc.
    },
    settings: {
      react: { version: 'detect' }, // Auto-detect installed React version
    },
    plugins: {
      react, // React rules
      'react-hooks': reactHooks, // Hooks rules
      'react-refresh': reactRefresh, // HMR constraints
      'jsx-a11y': jsxA11y, // A11y rules
      import: importPlugin, // Import hygiene
      'simple-import-sort': simpleImportSort, // Import sorting
      'unused-imports': unusedImports, // Unused cleanup
    },
    rules: {
      // -------------------------
      // React correctness
      // -------------------------
      ...react.configs.recommended.rules, // Common React issues
      'react/react-in-jsx-scope': 'off', // New JSX transform (no need to import React)
      'react/prop-types': 'off', // TS already types props

      // -------------------------
      // Hooks correctness
      // -------------------------
      ...reactHooks.configs.recommended.rules, // Rules of hooks + deps

      // -------------------------
      // Vite Fast Refresh stability
      // -------------------------
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Allow exporting constants without breaking refresh
      ],

      // -------------------------
      // Accessibility baseline
      // -------------------------
      ...jsxA11y.configs.recommended.rules, // Prevent obvious a11y mistakes

      // -------------------------
      // TypeScript hygiene
      // -------------------------
      'no-unused-vars': 'off', // Turn off base rule (TS version is better)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Allow unused args like (_, req)
          varsIgnorePattern: '^_', // Allow unused vars like _temp
          caughtErrorsIgnorePattern: '^_', // Allow unused catch (e.g. catch (_e))
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports', // Keeps type imports clean + faster compile edges
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage “I gave up” typing
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'], // Prefer `type` for consistency

      // -------------------------
      // Imports: consistency + readability
      // -------------------------
      'import/first': 'error', // Imports must come first
      'import/no-duplicates': 'error', // Prevent duplicate import lines
      'import/newline-after-import': 'warn', // Add newline after imports for readability
      'simple-import-sort/imports': 'warn', // Auto-sort imports (stable diffs)
      'simple-import-sort/exports': 'warn', // Auto-sort exports

      // -------------------------
      // Dead code removal (high value)
      // -------------------------
      'unused-imports/no-unused-imports': 'error', // Remove unused imports (keeps codebase clean)
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_', // Keep underscore vars allowed
          args: 'after-used',
          argsIgnorePattern: '^_', // Keep underscore args allowed
        },
      ],

      // -------------------------
      // Shipping safety rules
      // -------------------------
      'no-debugger': 'error', // Never ship debugger
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow intentional logging only
      eqeqeq: ['error', 'always'], // Avoid coercion bugs
      curly: ['error', 'all'], // Prevent “one-line if” footguns
    },
  },

  // 5) Node-ish config files (so eslint/vite config can use node globals)
  {
    files: [
      '**/*.{config,conf}.{js,ts}',
      'vite.config.{ts,js}',
      'eslint.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // 6) Tests can be slightly looser (optional)
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Mocks often need `any`
      'no-console': 'off', // Test debugging is fine
    },
  }
);
