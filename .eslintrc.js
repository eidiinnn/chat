module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["jest"],
  overrides: [
    {
      files: ["./__test__/**"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: { "jest/prefer-expect-assertions": "off" },
    },
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [".eslintrc.js", "__test__"],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    // ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/strict-boolean-expressions": "off",
  },
};
