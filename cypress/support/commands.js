// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
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
Cypress.Commands.add('formRequest', (method, url, authorisationType, token,  formData, done) => {
  cy.addContext("xhr art"); 
  const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader(authorisationType, token);
        xhr.setRequestHeader("content-type", 'multipart/form-data;');
        
        xhr.onload = function () {
            done(xhr);
        };

        xhr.onerror = function () {
            done(xhr);
        };

        xhr.send(formData);
        cy.addContext("xhr done");
});
Cypress.Commands.add('waitForHealthyUpstream', (elementLocator) => {
  cy.log('Waiting for the upstream to become healthy');
  let retryCount = 0;
  const maxRetries = 5;
  const retryInterval = 5000;

  cy.waitUntil(() => {
    retryCount += 1;
    return cy.get(elementLocator).should('be.visible').then(() => retryCount >= maxRetries);
  }, { timeout: maxRetries * retryInterval });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
  });
//cypress/support/commands.js
import "cypress-intercept-formdata";
// import 'cypress-file-upload';
// Cypress.Commands.add('fileUpload', fileName,ele => {
//  // const fileName = 'your_excel_file.xlsx'; // Make sure the file is in the 'cypress/fixtures' folder
// cy.fixture(fileName).then(fileContent => {
//     cy.get(ele[0]).attachFile({ fileContent, fileName, mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// });


Cypress.Commands.add('waitForRemoteModulesLoad', () => {
  return cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      let timeout;
      const interval = setInterval(() => {
        const requests = win.performance.getEntriesByType('resource');
        const foundRequest = requests.filter((request) => request.name.match('/panellayer'));
        if (foundRequest > 0) {
          clearInterval(interval); // Stop the interval once the request is found
          const promises = foundRequest.map(() => {
            return cy.wait(`@panelLayer`);
          });
          // Wait for all responses associated with the matching requests
          Promise.all(promises).then((interceptedResponses) => {
            clearTimeout(timeout); // Clear the timeout once all responses are received
            resolve(interceptedResponses); // Resolve with the intercepted responses
          });
        }
      }, 1000); // Check every 1 second

      // Set a timeout to handle the scenario where the request doesn't happen within a specified time
      timeout = setTimeout(() => {
        clearInterval(interval); // Stop the interval
        resolve(null); // Resolve with null if the request is not found within the specified time
      }, 10000); // Timeout after 30 seconds (adjust as needed)
    });
  });
});

Cypress.Commands.add('feedBackPopupClose', () => {
  return cy.window().then((win) => {
    const requests = win.performance.getEntriesByType('resource');
    const returnValue = requests.some((request)=>{
      if(request.name.includes('npsui.shopups1.xyz')){
        cy.task('printInConsole','found : '+request.name)
        return true
      }
    })
    return cy.then(()=>{
      return (returnValue)? true: false
    })
  });
});