describe('e2e app test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearCookies();
  });
  it('renders language selection panel', () => {
    cy.getElementByDataCy('language-selection-panel').should('exist');
    cy.getElementByDataCy('language-english').click();
  });
  it('renders welcome panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('welcome-card').should('exist');
    cy.getElementByDataCy('play-button').click();
  });
  it('renders photo-upload panel', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('play-button').click();
    cy.getElementByDataCy('upload-pic-card').should('exist');
    cy.getElementByDataCy('no-picture-button').click();
  })
  it('renders selection options', () => {
    cy.getElementByDataCy('language-english').click();
    cy.getElementByDataCy('play-button').click();
    cy.getElementByDataCy('no-picture-button').click();
    cy.getElementByDataCy('gender-selection-card-Male').should('exist');
    cy.getElementByDataCy('gender-selection-card-Female').click()
    cy.getElementByDataCy('age-selection-card-Elderly').should('exist');
  });
  // TODO: Refactor API Calls, and then add back in
  // it('renders 2 cards in a deck', () => {
  //   cy.getElementByDataCy('play-button').click();
  //   cy.getElementByDataCy('no-picture-button').click();
  //   cy.getElementByDataCy('gender-selection-card-Female').click()
  //   cy.getElementByDataCy('age-selection-card-ADULT').click()
  //   cy.getElementByDataCy('person-card').should('exist');
  //   cy.getElementByDataCy('deck').should('exist');
  //   cy.checkNumberOfCardsIs('person-card', 2);
  // });
  // it('renders the next deck when card is clicked', () => {
  //   cy.getElementByDataCy('play-button').click();
  //   cy.getElementByDataCy('no-picture-button').click();
  //   cy.getElementByDataCy('gender-selection-card-Female').click()
  //   cy.getElementByDataCy('age-selection-card-ADULT').click()
  //   cy.getElementByDataCy('deck').should('exist');
  //   cy.clickPersonCard('person-card');
  //   cy.checkNumberOfCardsIs('person-card', 2);
  // });
});
