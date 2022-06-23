/* eslint-env node */
module.exports = {
  extends: ['airbnb-base', 'plugin:compat/recommended'],
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
};
