describe('e2e app test', () => {
  before(() => {
    cy.visit('/');
  });
  it('renders selection options', () => {
    cy.getElementByDataCy('gender-selection-card').should('exist');
    cy.checkNumberOfCardsIs('gender-selection-card', 2);
    cy.clickFirstCard('gender-selection-card');
    cy.getElementByDataCy('age-selection-card').should('exist');
    cy.checkNumberOfCardsIs('age-selection-card', 4);
    cy.clickFirstCard('age-selection-card');
  });
  it('renders 2 cards in a deck', () => {
    cy.getElementByDataCy('person-card').should('exist');
    cy.checkNumberOfCardsIs('person-card', 2);
  });
  it('renders the next deck when card is clicked', () => {
    cy.getElementByDataCy('deck-0').should('exist');
    cy.clickPersonCard('person-card');
    cy.getElementByDataCy('deck-1').should('exist');
    cy.checkNumberOfCardsIs('person-card', 2);
  });
});
