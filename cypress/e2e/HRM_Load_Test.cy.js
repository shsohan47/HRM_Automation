import "cypress-file-upload";

describe("Load Test", () => {
  let CompanyNameCount = 1;
  let CompanyDetailsCount = 1;
  let CompanyHRCount = 1;
  let CompanyHR_emailCount = 1;

  //Company name counter
  function generaterandomCompanyname() {
    var name = "company" + CompanyNameCount;
    CompanyNameCount++;
    return name;
  }

  //Company Details Counter
  function generaterandomCompanyDetails() {
    var Details = "companyDetails" + CompanyDetailsCount;
    CompanyDetailsCount++;
    return Details;
  }

  //File Upload
  function FileUpload(filePath, filename) {
    cy.readFile(filePath, "binary").then((fileContent) => {
      cy.get('[type="file"]').attachFile({
        fileContent: fileContent.toString("base64"),
        fileName: filename,
        mimeType: "image/jpeg",
      });
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
    var name = "HR" + CompanyHR_emailCount + "@gmail.com";
    CompanyHR_emailCount++;
    return name;
  }

  it("passes", () => {
    cy.visit("/registration-form");

    for (let i = 0; i < 1000; i++) {
      cy.visit("/registration-form");
      cy.get('[name="companyName"]').type(generaterandomCompanyname(),{force:true});
      cy.get('[name="companyDetails"]').type(generaterandomCompanyDetails(),{force:true});
      cy.get('[name="address"]').type("Demo Address",{force:true});
      FileUpload("Picture/test.jpeg", "test.jpeg",{force:true});
      cy.get('[name="contactNumber"]').type(GenerateMobileNumber(),{force:true});
      cy.get(".next").click({force:true});
      cy.wait(1000);
      cy.get(
        '[style="display: block; left: 0%; opacity: 1;"] > [type="text"]'
      ).type(generaterandomHRname(),{force:true});
      cy.get('[type="email"]').type(generaterandomHRemail(),{force:true});
      cy.get("#password").type("123456789",{force:true});
      cy.get("#password_confirmation").type("123456789",{force:true});

      cy.get('[type="email"]').invoke('val').as("emailId");
      cy.get("#password").invoke('val').as("passwordId");
        cy.get('@emailId').then((id)=>
        {
          cy.log("email: ", id);
        })
      cy.get('@passwordId').then((pass)=>{
        cy.log("password: ", pass);
      })
      

      //Submit button

      //Comment the button for user permission
      //cy.get("#submitBtn").click({force:true});
    }
  });
});
