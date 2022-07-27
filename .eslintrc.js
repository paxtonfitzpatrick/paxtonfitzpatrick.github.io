/* eslint-env node */
// eslint-disable-next-line strict
module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base/rules/best-practices',
    'airbnb-base/rules/errors',
    'airbnb-base/rules/style',
    'airbnb-base/rules/variables',
    'airbnb-base/rules/es6',
    'plugin:compat/recommended',
  ],
  plugins: ['compat'],
  env: {
    browser: true,
    es2019: true,
    jquery: true,
    node: false,
  },
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 2019,
  },
  overrides: [
    {
      files: 'assets/js/particle-image/*',
      parserOptions: { sourceType: 'module' },
    },
  ],
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    // https://eslint.org/docs/latest/rules/object-curly-newline
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    // https://eslint.org/docs/latest/rules/object-shorthand
    // 'object-shorthand': ['error', 'consistent'],
    'object-shorthand': [
      'error',
      'always',
      {
        avoidExplicitReturnArrows: false,
        avoidQuotes: true,
        ignoreConstructors: false,
      },
    ],
    strict: ['warn', 'safe'],
  },
};
