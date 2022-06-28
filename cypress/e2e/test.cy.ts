/// <reference types="cypress" />

describe("test sign in action", () => {

    beforeEach(()=>{
        cy.visit("/dashboard")
    })

    it("should redirect to dashboard",()=>{
        cy.get("body")
    })
});
