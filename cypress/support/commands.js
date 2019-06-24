// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getElementByDataCy', dataCyTag => cy.get(`[data-cy=${dataCyTag}]`));

Cypress.Commands.add('clickPersonCard', () => {
  cy.getElementByDataCy('person-card').first().click();
});

Cypress.Commands.add('clickFirstCard', (id) => {
  cy.getElementByDataCy(id).first().click();
});

Cypress.Commands.add('clickThirdCard', (id) => {
  cy.getElementByDataCy(id).third().click();
});

Cypress.Commands.add('checkNumberOfCardsIs', (id, expectedNumber) => {
  cy.getElementByDataCy(id)
    .should(($cards) => {
      expect($cards).to.have.length(expectedNumber);
    });
});
;
