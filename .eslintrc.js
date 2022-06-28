/* eslint-env node */
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
    es6: true,
    jquery: true,
    node: false,
  },
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'no-empty': ['error', { allowEmptyCatch: true }],
    // https://eslint.org/docs/latest/rules/object-shorthand
    'object-shorthand': ['warn', 'consistent'],
    strict: ['warn', 'safe'],
  },
};
