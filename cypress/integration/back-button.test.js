describe('e2e app test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearCookies();
  });
  it('goes back to language panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('back-button').click()
    cy.getElementByDataCy('language-english').should('exist');
  });
  it('goes back to welcome panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('play-button').click();
    cy.getElementByDataCy('back-button').click();
    cy.getElementByDataCy('welcome-card').should('exist');
  });
  it('goes back to upload pic panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('play-button').click();
    cy.getElementByDataCy('no-picture-button').click();
    cy.getElementByDataCy('back-button').click();
    cy.getElementByDataCy('upload-pic-card').should('exist');
  });
  it('goes back to gender selection panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('play-button').click();
    cy.getElementByDataCy('no-picture-button').click();
    cy.getElementByDataCy('gender-selection-card-Female').click()
    cy.getElementByDataCy('back-button').click();
    cy.getElementByDataCy('gender-selection-card-Female').should('exist');
  });
});