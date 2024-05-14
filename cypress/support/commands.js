import 'cypress-wait-until';
import "cypress-real-events";
const addContext = require('mochawesome/addContext');

Cypress.Commands.add('addContext', (context) => {
  cy.once('test:after:run', (test) => addContext({ test }, context));
});
Cypress.Commands.add('forceVisit', url => {
    cy.window().then(win => {
        return win.open(url, '_self');
    });
});

Cypress.Commands.add('waitForElement', (elementLocator) => {
  cy.log('Waiting for the upstream to become healthy');
  let retryCount = 0;
  const maxRetries = 5;
  const retryInterval = 5000;

  cy.waitUntil(() => {
    retryCount += 1;
    return cy.get(elementLocator).should('be.visible').then(() => retryCount >= maxRetries);
  }, { timeout: maxRetries * retryInterval });
});
