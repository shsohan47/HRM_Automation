import "cypress-file-upload";


describe('Load Test', () => {
  let count  = 1;
  //Company name counter
  function generaterandomCompanyname()
  {
    var name = "company" + count;
    count++;
    return name;
  }


  //Company Details Counter
  function generaterandomCompanyDetails()
  {
    var Details = "companyDetails" + count;
    count++;
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

  it('passes', () => {
    cy.visit('/registration-form');

    for (let i=0;i<1000;i++)
    {
      cy.visit('/registration-form');
      cy.get('[name="companyName"]').type(generaterandomCompanyname())
      cy.get('[name="companyDetails"]').type(generaterandomCompanyDetails());
      cy.get('[name="address"]').type("Demo Address");
      FileUpload("Picture/test.jpeg","test.jpeg");
      
      


    }
  })
})