const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    baseUrl: 'https://hrm.aamarpay.dev/login-form',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
