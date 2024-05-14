const fs = require('fs')
module.exports = {
  projectId: process.env.projectId || "",
  chromeWebSecurity: false,
  defaultCommandTimeout: 80000,
  // experimentalSessionAndOrigin: true,
  pageLoadTimeout:190000,
  redirectionLimit: 1000,
  retries: 0,

  // below 2 lines added to inyegrate the awesome report plugin  
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true,
    saveJson: true
  }, 
  env: {
    environment: 'local',   
    demoUrl:'https://demowebshop.tricentis.com/'
    
  },
  
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // below 1 line added to integrate the awesome report plugin 
      require('cypress-mochawesome-reporter/plugin')(on);

      return require('./cypress/plugins/index.js')(on, config)
    },
    experimentalMemoryManagement :true,
    testIsolation: false,
    specPattern: './test-suite/**/*.cy.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: false,
    downloadsFolder: "cypress/downloads",
  },
}
