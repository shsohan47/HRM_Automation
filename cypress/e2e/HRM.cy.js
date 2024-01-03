describe("Hrm admin panel automation Script", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  const name = "Demo Department";
  const deleteData = (name) => {
    cy.get(".form-control.form-control-sm").eq(1).type(name);
    cy.get("table").contains("td", name).parent("tr").as("deleteData");

    cy.get("@deleteData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-item").eq(1).click({ force: true });
    cy.get(".btn.btn-primary.continue-btn").click({ force: true });
    cy.wait(3000);
    cy.get("@deleteData").should("not.exist");
  };

  beforeEach(
    "Before every function this will test visit and login functionality",
    () => {
      //Invalid credential
      //visit the website
      cy.visit("/login-form");
      // check weather the url we visit is valid & correct
      cy.url().should("eq", "https://hrm.aamarpay.dev/login-form");
      //get the email field
      cy.get('[name="email"]').type("hr-2@aamarpay.com");
      //get password field
      cy.get('[name="password"]').type("hr-2@aamarpay.com");
      //click the login button
      cy.get(".btn.btn-primary.account-btn").click();
      cy.get(".alert.alert-danger").should("be.visible");

      //visit the website
      cy.visit("/login-form");
      // check weather the url we visit is valid & correct
      cy.url().should("eq", "https://hrm.aamarpay.dev/login-form");
      //get the email field
      cy.get('[name="email"]').type("a@gmail.com");
      //get password field
      cy.get('[name="password"]').type("123456789");
      //click the login button
      cy.get(".btn.btn-primary.account-btn").click();
      cy.url().should("eq", "https://hrm.aamarpay.dev/department");
    }
  );
  //Invalid Login Functionality
  it("Create Department Functionality", () => {
    cy.get(".col-auto.float-end.ms-auto").click();
    //this will show a modal content
    cy.get(".modal-content").should("be.visible");
    //make a department use case
    cy.get('[name="deptTitle"]').eq(0).type(name);
    cy.get('[name="details"]').eq(0).type("demo department description");
    cy.get(".btn.btn-primary.submit-btn").click({
      multiple: true,
      force: true,
    });
    cy.wait(2000);
  });
  it("Search and delete functionality in department panel!", () => {
    //Department search button functionality
    cy.get(".form-control.form-control-sm").eq(1).type(name);
    cy.get("table").contains("td", name).should("exist");
    //CLEAR SEARCH FIELD
    cy.get(".form-control.form-control-sm").eq(1).clear();
    //delete the created data
    deleteData(name);
    //For commit actions
  });
});
