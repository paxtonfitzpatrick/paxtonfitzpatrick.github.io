import path from 'node:path';
import { defineConfig, globalIgnores } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import compat from 'eslint-plugin-compat';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import globals from 'globals';

export default defineConfig([
  // must be outside main config block to work because .gitignore includes dir
  // patterns, and non-global ignores can only match file names
  // (**/node_modules/ & .git/ are ignored by default)
  globalIgnores([
    // inherit ignores from .gitignore
    ...includeIgnoreFile(path.resolve('.gitignore')).ignores,
    // minified files & source maps
    '**/*.min.js',
    '**/*.min.js.map',
    // vendored scripts
    'assets/js/creative.js',
  ]),
  // main config
  {
    files: ['**/*.js'],
    plugins: {
      js,
      // plugins required internally by eslint-config-airbnb-base
      '@stylistic': plugins.stylistic.plugins['@stylistic'],
      'import-x': plugins.importX.plugins['import-x'],
    },
    extends: [
      'js/recommended',
      configs.base.recommended,
      compat.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: { ...globals.browser, ...globals.jquery },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-plusplus': 'off',
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'one-var': ['error', 'consecutive'],
      'operator-linebreak': ['error', 'before'],
      strict: ['error', 'global'],
    },
  },
  // consider config files modules so imports/exports don't prevent linting
  {
    files: ['eslint.config.js', 'stylelint.config.js'],
    languageOptions: {
      sourceType: 'module',
    },
  },
]);
