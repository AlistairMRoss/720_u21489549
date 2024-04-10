/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: ['standard-with-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  }
}

