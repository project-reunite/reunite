describe('e2e app test', () => {
  before(() => {
    cy.visit('/');
  });
  it('renders 3 cards in a deck', () => {
    cy.getElementByDataCy('person-card').should('exist');
    cy.checkNumberOfPersonCardsIs(3);
  });
  it('renders the next deck when card is clicked', () => {
    cy.getElementByDataCy('deck-0').should('exist');
    cy.clickPersonCard();
    cy.getElementByDataCy('deck-1').should('exist');
    cy.checkNumberOfPersonCardsIs(3);
  });
});
