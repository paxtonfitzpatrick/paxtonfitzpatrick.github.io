import path from 'node:path';
import { defineConfig, globalIgnores } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import compat from 'eslint-plugin-compat';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import browserslist from 'browserslist';
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
    settings: {
      // browsers to check for compatibility with eslint-plugin-compat
      // (`browsersList()` resolves query to an explicit list of browsers)
      browsers: browserslist(['defaults', 'not op_mini all']),
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: { ...globals.browser, ...globals.jquery },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-plusplus': 'off',
      'one-var': ['error', 'consecutive'],
      'operator-linebreak': ['error', 'before'],
      'no-use-before-define': ['error', 'nofunc'],
      strict: ['error', 'global'],
      '@stylistic/max-len': ['error', { code: 120 }],
      '@stylistic/no-mixed-operators': 'off',
      '@stylistic/indent': ['error', 2, { VariableDeclarator: 'first' }],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
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
