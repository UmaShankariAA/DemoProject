// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// Adding below 1 line for awesome reporting plugin integration
import 'cypress-mochawesome-reporter/register';
require('cypress-xpath');
import 'cypress-each';
// cypress/support/index.js
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()