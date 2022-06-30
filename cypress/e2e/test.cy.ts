/// <reference types="cypress" />

describe("cases that should lead into fail", () => {
  beforeEach(() => cy.visit("/dashboard"));

  it("send blank form", () => {});

  it("send random number", () => {
    cy.get("input[name]").then((els) => {
      [...els].forEach((el) => cy.wrap(el).type("10"));
    });
  });

  it("type words", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(0).type("král jelimán");
    cy.get("input[name]").eq(1).type("král jelimán");
    cy.get("input[name]").eq(2).type("král jelimán");
    cy.get("input[name]").eq(3).type("král jelimán");
  });

  it("one value is missing", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(1).type("20");
    cy.get("input[name]").eq(2).type("10");
    cy.get("input[name]").eq(3).type("10");
  });

  it("from > to", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(0).type("10");
    cy.get("input[name]").eq(1).type("20");
    cy.get("input[name]").eq(2).type("10");
    cy.get("input[name]").eq(3).type("10");
  });

  it("invalid hours", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(0).type("1");
    cy.get("input[name]").eq(1).type("20");
    cy.get("input[name]").eq(2).type("10");
    cy.get("input[name]").eq(3).type("10");
  });

  it("input in different order", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(1).type("1");
    cy.get("input[name]").eq(3).type("20");
    cy.get("input[name]").eq(2).type("10");
    cy.get("input[name]").eq(0).type("10");
  });

  it("invalid minutes", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(0).type("10");
    cy.get("input[name]").eq(1).type("20");
    cy.get("input[name]").eq(2).type("67");
    cy.get("input[name]").eq(3).type("10");
  });

  afterEach(() => {
    cy.get("button").click();
    cy.contains("Termíny lze rezervovat od 8 do 18 hodin včetně a nejméně na 30 minut.");
  });
});

describe("cases that should lead into succes", () => {
  beforeEach(() => cy.visit("/dashboard"));

  it("send proper time", () => {
    cy.contains("1").click();
    cy.get("input[name]").eq(0).type("10");
    cy.get("input[name]").eq(1).type("10");
    cy.get("input[name]").eq(2).type("11");
    cy.get("input[name]").eq(3).type("20");
  });

  afterEach(() => {
    cy.get("button").click();
    cy.contains("Úspěšně odesláno!");
  });
});
