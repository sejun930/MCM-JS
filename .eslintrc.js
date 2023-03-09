module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "***/tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    semi: "off",
    quotes: "off",
    camelcase: "off",
    indent: "off",
    curly: "off",
    "comma-dangle": "off",
    "no-undef": "off",
    "space-before-function-paren": "off",
    "import/no-duplicates": "off",
    "no-var": "off",
    "one-var": "off",
    "quote-props": "off",
    "no-void": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
  },
};
