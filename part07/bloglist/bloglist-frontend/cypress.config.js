// eslint-disable-next-line no-undef
const { defineConfig } = require("cypress");

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
