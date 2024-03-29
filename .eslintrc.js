module.exports = {
  globals: {
    __PATH_PREFIX__: true,
    ENV: true
  },
  parser: "babel-eslint",
  plugins: ["compat", "react-hooks", "markdown", "json"],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "react-app",
    "eslint:recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    "comma-dangle": ["error", "never"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "consistent-return": 0,
    indent: 0,
    "no-unused-expressions": 0,
    "no-nested-ternary": 0,
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"]
      }
    ],
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": [
      "error",
      {
        allow: ["warn", "error"]
      }
    ],
    "no-unused-vars": 0,
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true
      }
    ],

    "react/no-unused-prop-types": 0,
    "react/no-danger": 0,
    "react/forbid-prop-types": 0,
    "react/prop-types": ["error", { skipUndeclared: true }],
    "react/require-default-props": 0,
    semi: ["error", "always"]
  }
};
