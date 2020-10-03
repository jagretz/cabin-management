module.exports = {
  extends: [
    "@jagretz/eslint-config-base",
    "@jagretz/eslint-config-react",
    "./eslint-overrides.js",
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  rules: {
    "react/prop-types": ["error", { ignore: ["firebase", "history"] }],
  },
};
