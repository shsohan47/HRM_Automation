import "cypress-file-upload";
let currentEmail, currentPass;
describe("Load Test", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  let EmployeeNameCount = 63;
  let CompanyNameCount = 63;
  let CompanyDetailsCount = 63;
  let CompanyHRCount = 63;
  let CompanyHR_emailCount = 63;

  //Company name counter
  function generaterandomCompanyname() {
    var name = "company" + CompanyNameCount;
    CompanyNameCount++;
    return name;
  }
  //Generate fully random email for employee
  function generaterandomEmployeeEmail() {
    var Details = "employee" + Math.floor(Math.random() * Math.pow(10,8))+"@gmail.com";
    
    return Details;
  }

  //Company Details Counter
  function generaterandomCompanyDetails() {
    var Details = "companyDetails" + CompanyDetailsCount;
    CompanyDetailsCount++;
    return Details;
  }

  //Company Employee Name Generator
  function generaterandomEmployeeName() {
    var Details = "Employee" + EmployeeNameCount;
    EmployeeNameCount++;
    return Details;
  }

  //File Upload
  function fileUpload(filePath, fileType) {
    cy.fixture(filePath, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const fileName = filePath.split("/").pop();
        const mimeType = fileType || "application/octet-stream";

        cy.get('[type="file"]').attachFile(
          { fileContent: blob, fileName, mimeType },
          { subjectType: "input" }
        );
      });
  }

  //generate mobile number
  function GenerateMobileNumber() {
    const firstThreeDigits = "019";
    const randomPart = Math.floor(Math.random() * Math.pow(10, 8))
      .toString()
      .padStart(8, "0");
    return firstThreeDigits + randomPart;
  }

  //Generate HR unique name
  function generaterandomHRname() {
    var name = "HR" + CompanyHRCount;

    CompanyHRCount++;
    return name;
  }

  //Generate HR unique email
  function generaterandomHRemail() {
    var name = "hr" + CompanyHR_emailCount + "@gmail.com";
    CompanyHR_emailCount++;
    return name;
  }

  it("passes", () => {
    cy.visit("/registration-form");

    for (let i = 0; i < 500; i++) {
      cy.visit("/registration-form");
      cy.get('[name="companyName"]').type(generaterandomCompanyname(), {
        force: true,
      });
      cy.get('[name="companyDetails"]').type(generaterandomCompanyDetails(), {
        force: true,
      });
      cy.get('[name="address"]').type("Demo Address", { force: true });
      fileUpload("Picture/test.jpeg", "image/jpeg");
      cy.get('[name="contactNumber"]').type(GenerateMobileNumber(), {
        force: true,
      });
      cy.get(".next").click({ force: true });
      cy.wait(1000);
      cy.get(
        '[style="display: block; left: 0%; opacity: 1;"] > [type="text"]'
      ).type(generaterandomHRname(), { force: true });
      cy.get('[type="email"]').type(generaterandomHRemail(), { force: true });
      cy.get("#password").type("123456789", { force: true });
      cy.get("#password_confirmation").type("123456789", { force: true });
      cy.get;
      cy.get('[type="email"]').invoke("val").as("emailId");
      cy.get("#password").invoke("val").as("passwordId");
      cy.wait(1000);
      cy.get("#submitBtn").click({ force: true });
      cy.wait(3000);

      cy.wrap()
        .then(() => {
          return cy.get("@emailId").then((id) => {
            currentEmail = id;
          });
        })
        .then(() => {
          return cy.get("@passwordId").then((pass) => {
            currentPass = pass;
          });
        })
        .then(() => {
          cy.visit("/login",{force:true});

          // Type the email using the aliased variable
          cy.get(".form-control").eq(0).type(currentEmail);
          //cy.log("email: ", currentEmail);
          cy.get(".form-control").eq(1).type(currentPass);
          cy.get(".btn.btn-primary.account-btn").click({ fore: true });
        });

      cy.url().should("eq", "https://hrm.aamarpay.dev/department");

      cy.visit("/department");
      cy.get(".btn.add-btn").click({ force: true });
      cy.wait(1000)
      cy.get('#msform > .input-block > [name="deptTitle"]').type(
        "Hello Department"
      );
      cy.get('#msform > .input-block > [name="details"]').type(
        "Hello Department Description"
      );
      cy.get("#msform > .submit-section > .btn").click({ force: true });

      cy.wait(1000)
      cy.visit("/designation");
      cy.get(".btn.add-btn").click({ force: true });
      cy.get("#add_designation > .modal-dialog > .modal-content > .modal-body");
      cy.get("#desig_form > :nth-child(1) > .form-control").type(
        "Hello Designation"
      );
      cy.get("#desig_form > :nth-child(2) > .form-control").type(
        "Hello Designation Description"
      );
      cy.get("#select2-dept_id1-container").click();
      cy.get(".select2-results__options").within(() => {
        cy.contains("Hello Department").click({ force: true });
      });
      cy.get("#desig_form > .submit-section > .btn").click({ force: true });

    

      for (let index = 0; index < 20; index++) {
        cy.wait(3000);
        cy.visit("/employee");
        
        cy.get(".btn.add-btn.add-employee").click();

        cy.get('#msform > .row > :nth-child(1) > .input-block > .form-control').type(generaterandomEmployeeName());
        cy.get('#msform > .row > :nth-child(2) > .input-block > .form-control').type(generaterandomEmployeeEmail());
        cy.get('#password1').type("123456789");
        cy.get('#password_confirmation').type("123456789");
        cy.get(':nth-child(5) > .input-block > .form-control').type(GenerateMobileNumber());
        cy.get(':nth-child(6) > .input-block > .cal-icon > .form-control').clear().type("1998-01-28");
        
        cy.get('#select2-selectDept-container').click({force:true});
        
        cy.get('.select2-dropdown.select2-dropdown--below').within(()=>
        {
          cy.contains("Hello Department").click({force:true})
          cy.wait(2000)
        })
        cy.get('#msform > .row > :nth-child(8) > .input-block > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click({force:true})
        
        cy.get('.select2-dropdown.select2-dropdown--below').within(()=>
        {
          cy.contains("Male").click({force:true});
          
        })
 
        cy.get('#select2-desig_id-container').click({force:true})
        cy.get('.select2-dropdown.select2-dropdown--below').within(()=>
        {
          cy.contains("Hello Designation").click({force:true});
        })
        cy.get('#msform > .submit-section > .btn').click({force:true});

      }
        cy.visit("/department");
        cy.get('.nav-item > .dropdown-toggle').click({force:true})
        cy.get(".dropdown-menu.show").within(()=>
        {
          cy.contains("Logout").click({force:true});
        })
    }
  });
});
