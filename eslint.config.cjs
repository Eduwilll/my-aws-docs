module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-console": "warn"
  }
};