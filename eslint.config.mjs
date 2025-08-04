// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import simpleImportSort from 'eslint-plugin-simple-import-sort';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [{
  files: ['src/**/*.{ts,tsx}'],
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'curly': ['error', 'all'],
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: true,
    },
  },
}, ...storybook.configs["flat/recommended"]];
