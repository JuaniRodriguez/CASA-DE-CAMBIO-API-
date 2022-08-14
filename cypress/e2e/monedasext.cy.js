
const URL="127.0.0.1:8080";



describe("Test de casa de cambio",()=> {
  before(()=> {
    cy.visit(URL);
  })

  it("testea de que haya elementos en la lista y los agrega a una lista",()=> {
  cy.get(".base").type("EUR")
  cy.get(".fecha").type("2022-02-06")
  cy.get(".calcular").click()
  cy.get(".cambioMonedas li").should("not.have.length",0)
  
  })


})