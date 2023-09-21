module.exports = {
    extends: [
      'airbnb/base',
      'airbnb-typescript/base',
      'prettier',
    ],
    plugins: ['prettier'],
    parserOptions: {
      'project': './tsconfig.json',
      tsconfigRootDir: __dirname,
    },
    ignorePatterns : ['.eslintrc.js'],
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-require-imports": "error" ,
      "no-await-in-loop": "off"
    }
  };