module.exports = {
  extends: 'standard-with-typescript',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json','./packages/*/tsconfig.json']
  },
  plugins:['@typescript-eslint'],
  root: true
}