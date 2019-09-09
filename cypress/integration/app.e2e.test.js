describe("e2e app test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearCookies();
  });
  it("renders language selection panel", () => {
    cy.getElementByDataCy("language-selection-panel").should("exist");
    cy.getElementByDataCy("language-english").click();
  });
  it("renders welcome panel", () => {
    cy.getElementByDataCy("language-english").click();
    cy.getElementByDataCy("welcome-card").should("exist");
    cy.getElementByDataCy("begin").click();
  });
  it("renders photo-upload panel", () => {
    cy.getElementByDataCy("language-english").click();
    cy.getElementByDataCy("begin").click();
    cy.getElementByDataCy("demo-info-panel").should("exist");
    cy.getElementByDataCy("start").click();
  });
});
