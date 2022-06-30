/// <reference types="cypress" />

describe("cases that should lead into failure submit", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("submit blank form", () => {
    cy.get("button").click();
  });

  it("submit incorrect minute values", () => {
    cy.get("input[name]").then((els) => {
      [...els].forEach((el) => cy.wrap(el).type("10"));
    });

    cy.get("button").click();
  });

  afterEach(() => {
    cy.get("[data-cy='error']").should("contain", "Termíny lze rezervovat od 8 do 18 hodin včetně.");
  });
});

describe("cases that should lead into succesful submit", () => {
  beforeEach(() => {
    cy.visit("/dashboard");
  });

  it("type values properly", ()=>{
    cy.contains("1").click()
    cy.get("input[name]").then((els)=>{
        [...els].forEach((el)=>cy.wrap(el).type("10"))
    })
  })

  afterEach(() => {
    cy.get("button").click()
    cy.get("[data-cy='error']").should("be.empty")
    cy.get("input").should("be.empty")
  });
});
