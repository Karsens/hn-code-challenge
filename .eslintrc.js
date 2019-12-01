module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },

  parser: "babel-eslint",
  rules: {
    quotes: ["error", "double"],
    "no-use-before-define": 0,
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100
      }
    ]
  },
  plugins: ["react", "prettier"]
};
