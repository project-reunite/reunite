describe('e2e app test', () => {
  before(() => {
    cy.visit('/');
  });
  it('renders welcome panel', () => {
    cy.getElementByDataCy('welcome-panel').should('exist');
    cy.getElementByDataCy('play-button').click();
  });
  it('renders photo-upload panel', () => {
    cy.getElementByDataCy('upload-pic-panel').should('exist');
    cy.getElementByDataCy('no-picture-button').click();
  })
  it('renders selection options', () => {
    cy.getElementByDataCy('gender-selection-card-Male').should('exist');
    cy.getElementByDataCy('gender-selection-card-Female').click()
    cy.getElementByDataCy('age-selection-card-CHILD').should('exist');
    cy.getElementByDataCy('age-selection-card-ADULT').click()
  });
  it('renders 2 cards in a deck', () => {
    cy.getElementByDataCy('person-card').should('exist');
    cy.checkNumberOfCardsIs('person-card', 2);
  });
  it('renders the next deck when card is clicked', () => {
    cy.getElementByDataCy('deck').should('exist');
    cy.clickPersonCard('person-card');
    cy.checkNumberOfCardsIs('person-card', 2);
  });
});
