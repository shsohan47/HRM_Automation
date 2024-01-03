describe("Hrm admin panel automation Script", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  //random department name generating
  const department_name = Math.random();
  const name = "demo department description";
  const deleteData = (name) => {
    //search the name user want to delete
    cy.get(".form-control.form-control-sm").eq(1).type(name);
    cy.get("table").contains("td", name).parent("tr").as("deleteData");

    cy.get("@deleteData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-menu.dropdown-menu-right.show")
    .within(()=>
    {
      cy.contains("Delete").click({force:true})
    })
    cy.get(".btn.btn-primary.continue-btn").click({ force: true });
    cy.wait(3000);
  };

  const EditData = () => {
    //cy.get(".form-control.form-control-sm").eq(1).type(name);
    cy.get("table tbody tr:first-child").as("editData");

    cy.get("@editData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-menu.dropdown-menu-right.show")
    .within(()=>
    {
      cy.contains("Edit").click({force:true})
    })
    cy.get("#deptName").clear()
    cy.get("#details").clear()
    cy.get("#deptName").type("people Care V2");
    cy.get("#details").type("people Care Department V2 edited");

    cy.get(".btn.btn-primary.submit-btn").click({ multiple: true,force: true });
    cy.wait(3000);
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
    cy.get('[name="deptTitle"]').eq(0).type(department_name);
    cy.get('[name="details"]').eq(0).type("demo department description");
    cy.get(".btn.btn-primary.submit-btn").click({
      multiple: true,
      force: true,
    });
    cy.wait(2000);
  });
  it("Search and delete functionality in department panel!", () => {
    //Department search button functionality
    cy.get(".form-control.form-control-sm").eq(1).type("demo department description");
    cy.get("table").contains("td", "demo department description").should("exist");
    //CLEAR SEARCH FIELD
    cy.get(".form-control.form-control-sm").eq(1).clear();
    //delete the created data
    deleteData(name);
    //For commit actions
  });
  it("Edit department functionality",()=>
  {
    EditData();
  })

  it("edit company details functionality and check wether edit make change in UI also or not!",()=>
  {
    const editCompanyDetails=(companyName, mobileNumber, companyAddress, companyDetails)=>
    {
      cy.visit('/company');
      cy.get('.pro-edit > .edit-icon > .fa-solid').click();
      cy.get('.col-md-12 > .row > :nth-child(1) > .input-block > .form-control').clear().type(companyName)
      cy.get('.col-md-12 > .row > :nth-child(2) > .input-block > .form-control').clear().type(mobileNumber)
      cy.get('form > :nth-child(2) > :nth-child(1) > .input-block > .form-control').clear().type(companyAddress)
      cy.get('form > :nth-child(2) > :nth-child(2) > .input-block > .form-control').clear().type(companyDetails)
      cy.get('.submit-section > .btn').click();
    //cy.get('.profile-img').invoke('image').should('contain', image);
    cy.get('.user-name.m-t-0.mb-0').invoke('text').should('contain', companyName)
    cy.get('.col-md-7 > .personal-info > :nth-child(3) > .text').invoke('text').should('contain', companyDetails)
    cy.get('.col-md-7 > .personal-info > :nth-child(4) > .text').invoke('text').should('contain', companyAddress)
    cy.get(':nth-child(1) > .text > a').invoke('text').should('contain', mobileNumber)
    cy.log()
    }
    editCompanyDetails("Company1", "01953714653", "Dhaka Narayanganj", "Fintech Company")

  })


});


