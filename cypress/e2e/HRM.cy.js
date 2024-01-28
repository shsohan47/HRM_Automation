import "cypress-file-upload";

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
    cy.get(".dropdown-menu.dropdown-menu-right.show").within(() => {
      cy.contains("Delete").click({ force: true });
    });
    cy.get(".btn.btn-primary.continue-btn").click({ force: true });
    cy.wait(3000);
  };

  const EditData = (name, details) => {
    //cy.get(".form-control.form-control-sm").eq(1).type(name);
    cy.get("table tbody tr:first-child").as("editData");

    cy.get("@editData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-menu.dropdown-menu-right.show").within(() => {
      cy.contains("Edit").click({ force: true });
    });
    cy.get("#deptName").clear();
    cy.get("#details").clear();
    cy.get("#deptName").type(name);
    cy.get("#details").type(details);

    cy.get(".btn.btn-primary.submit-btn").click({
      multiple: true,
      force: true,
    });
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
    cy.get(".form-control.form-control-sm")
      .eq(1)
      .type("demo department description");
    cy.get("table")
      .contains("td", "demo department description")
      .should("exist");
    //CLEAR SEARCH FIELD
    cy.get(".form-control.form-control-sm").eq(1).clear();
    //delete the created data
    deleteData(name);
    //For commit actions
  });
  it("Edit department functionality", () => {
    EditData("people Care V2", "people Care Department V2 edited");
  });

  it("edit company details functionality and check wether edit make change in UI also or not!", () => {
    const editCompanyDetails = (
      companyName,
      mobileNumber,
      companyAddress,
      companyDetails
    ) => {
      cy.visit("/company");
      cy.get(".pro-edit > .edit-icon > .fa-solid").click({ force: true });
      cy.get(".col-md-12 > .row > :nth-child(1) > .input-block > .form-control")
        .clear()
        .type(companyName);
      cy.get(".col-md-12 > .row > :nth-child(2) > .input-block > .form-control")
        .clear()
        .type(mobileNumber);
      cy.get(
        "form > :nth-child(2) > :nth-child(1) > .input-block > .form-control"
      )
        .clear()
        .type(companyAddress);
      cy.get(
        "form > :nth-child(2) > :nth-child(2) > .input-block > .form-control"
      )
        .clear()
        .type(companyDetails);
      cy.get(".submit-section > .btn").click();
      //cy.get('.profile-img').invoke('image').should('contain', image);
      cy.get(".user-name.m-t-0.mb-0")
        .invoke("text")
        .should("contain", companyName);
      cy.get(".col-md-7 > .personal-info > :nth-child(3) > .text")
        .invoke("text")
        .should("contain", companyDetails);
      cy.get(".col-md-7 > .personal-info > :nth-child(4) > .text")
        .invoke("text")
        .should("contain", companyAddress);
      cy.get(":nth-child(1) > .text > a")
        .invoke("text")
        .should("contain", mobileNumber);
      cy.log();
    };
    editCompanyDetails(
      "Company1",
      "01953714653",
      "Dhaka Narayanganj",
      "Fintech Company"
    );
  });

  //Create Office Location
  //Developer didnt work with that requirements
  // it.only("Create Office location Functionality!!", ()=>
  // {
  //   cy.visit('/office-location');
  // })

  //Search functionality

  function Search(name) {
    cy.get('input[type="search"]').type(name);
    cy.get("table tr td").contains(name).should("exist");
  }
function response (Url_name)
{
  cy.request(Url_name).then((response) => {
    if (response.status == 500) {
      cy.log("The server responding 500 internal server error");
    } else {
      expect(response.status).to.eq(200);
    }
  });
}
  //Edit Office Location
  it("Edit Office location Functionality(edit & Submit)!!", () => {
    cy.visit("/office-location");
    cy.get("table tbody tr:first-child").as("editData");

    cy.get("@editData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-menu.dropdown-menu-right.show").within(() => {
      cy.contains("Edit").click({ force: true });
    });
    cy.get("#locationName").clear({ force: true, multiple: true });
    cy.get("#longitude1").clear();
    cy.get("#latitude1").clear();
    cy.get("#radius").clear();
    cy.get("#locationName").type("Automation Office Location Name", {
      force: true,
      multiple: true,
    });
    //clicking and check weather this button can filled the latitude and longitude field
    //cy.get('#edit_department > .modal-dialog > .modal-content > .modal-body > .btn-info').click();
    cy.get("#longitude1").type("20.21").should("not.have.value", "");
    cy.get("#latitude1").type("90.51").should("not.have.value", "");
    cy.get("#radius").type("0.67");
    cy.get("#editSubmit > .submit-section > .btn").click({
      multiple: true,
      force: true,
    });
    cy.wait(3000);
    //cy.get('.swal2-popup.swal2-modal.swal2-icon-error.swal2-show').should('not.be.visible');
    cy.get("table tbody tr td")
      .eq(1)
      .should("contain", "Automation Office Location Name");
  });

  //status should not hidden
  it("Status field should not Hidden When Edit Office Location", () => {
    cy.visit("/office-location");
    cy.get("table tbody tr:first-child").as("editData");

    cy.get("@editData").within(() => {
      cy.get("td").last().find(".material-icons").click();
    });
    cy.get(".dropdown-menu.dropdown-menu-right.show").within(() => {
      cy.contains("Edit").click({ force: true });
    });
    cy.get("[name='status']").should("not.be.hidden");
  });

  //File upload function
  function FileUpload(filePath, filename) {
    cy.readFile(filePath, "binary").then((fileContent) => {
      cy.get(":nth-child(7) > .input-block > .form-control").attachFile({
        fileContent: fileContent.toString("base64"),
        fileName: filename,
        mimeType: "image/jpeg",
      });
    });
  }
  //Employee Test Script
  //=============================================================================
  //  it.only("Add Invalid Employee(Test Case) Functionality",()=>
  //  {
  //   //
  //   cy.visit("/employee");
  //   cy.get('#addEmployeeButton').click({force:true});
  //   cy.get('#add_employee > .modal-dialog > .modal-content > .modal-header').should("be.visible");
  //   cy.get('#msform > .row > :nth-child(1) > .input-block > .form-control').type("Employee");
  //   cy.get('#msform > .row > :nth-child(2) > .input-block > .form-control').type("employee1@aamarpay.com");
  //   cy.get('#password1').type("123456789")
  //   cy.get('#password_confirmation').type("123456789");
  //   cy.get(':nth-child(5) > .input-block > .form-control')
  //   cy.get(':nth-child(6) > .input-block > .cal-icon > .form-control')
  //   FileUpload("Picture/test.jpeg","test.jpeg");
  //   // Click on the dropdown to open it
  //   cy.get('#select2-selectDept-container').click().within(()=>
  //   {
  //     cy.wait(500)
  //     cy.get(".select2-results__option.select2-results__option--selectable.select2-results__option--highlighted")
  //   });

  //  })

  //Leave Test Script
  //====================================================
  //Leave application list
  it("Fetch leave application list and test other functionality", () => {
    //Api status Testing
    const leave_application_url = "/leave-application-list";
    response(leave_application_url);
    cy.visit("/leave-application-list");

    //page data count testing (10)
    cy.get(".custom-select").select("10");
    cy.get("table tr").should("have.length", 10 + 1); //add 1 because it also include table head
    //for 25
    cy.get(".custom-select").select("25");
    cy.get("table tr").should("have.length", 25 + 1); //add 1 because it also include table head
    //Search
    Search("Pending");

    //Edit Leave application list
    cy.get("table tr:nth-child(1) td:last").find(".material-icons").click().get(".dropdown-menu.dropdown-menu-right.show").as("edit_icon")
    cy.get("@edit_icon").within(()=>
    {
      cy.contains("Edit").click();
      
    })
    cy.get('#name').should('have.attr','disabled');
    cy.get('#start_date').should('have.attr','disabled');
    cy.get('#end_date').should('have.attr','disabled');
    cy.get('#reason').should('have.attr','disabled');
    cy.get('.select2-selection__rendered').click()
    cy.get(".select2-results__options").within(()=>
    {
      cy.contains("Pending").click({force:true});
    });
    cy.wait(2000);
    cy.get(".btn.btn-primary.submit-btn").click({force:true});
    cy.get('.swal2-confirm').click();
    cy.wait(2000);

    //Delete Leave Application List
    cy.get("table tr:nth-child(1) td:last").find(".material-icons").click().get(".dropdown-menu.dropdown-menu-right.show").as("delete_icon")
    cy.get("@delete_icon").within(()=>
    {
      cy.contains("Delete").click({force:true});
      
    })
    cy.get('#delete_leaveApplication > .modal-dialog > .modal-content > .modal-body').wait(2000).within(()=>
      {
        cy.get("#deptDelete > .btn").click({force:true});
      })

  });


  //Test Script For Attendance Functionality 
  it("Test Script For Attendance Functionality Add attendance Search Attendance",()=>
  {
    response("/attendance-list")
    cy.visit("/attendance-list");
    cy.get(".btn.add-btn").click();
    //Add Attendance
    cy.get('#add_department > .modal-dialog > .modal-content > .modal-body').as("add_attendance_modal")
    cy.get("@add_attendance_modal").wait(1000).within(()=>
    {
      cy.get(".select2-selection__rendered").eq(0).click();
    })
    cy.get(".select2-results__options").within(()=>
    {
      cy.contains("Md Shawkat Hossain sohan").click();
    })

    cy.get("@add_attendance_modal").wait(1000).within(()=>
    {
      cy.get(".select2-selection__rendered").eq(1).click();
    })
    cy.get(".select2-results__options").within(()=>
    {
      cy.contains("Check In").click();
    })

    cy.get("@add_attendance_modal").wait(1000).within(()=>
    {
      cy.get('.form-control').eq(0).type("2024-01-28T10:00:00");
    })
    //Submit and but should not accept the submission withoiut reason

    cy.get('#msform > .submit-section > .btn').click();
    cy.get('#msform > .submit-section > .btn').should("be.visible");
    cy.get('.swal2-confirm').click();
    

    cy.get("@add_attendance_modal").wait(1000).within(()=>
    {
      cy.get('.form-control').eq(1).type("Test Reason");
    })
    cy.get('#msform > .submit-section > .btn').click();

    
   


  })
  it.only("Check all functionality of attendance list",()=>
    {
       //Check weather this attendance include in database or not
    cy.visit("/attendance-list");
    cy.get('#date').type("2024-01-28");
    cy.get('[style="margin-top: 18px;"] > .btn').click();
    cy.wait(2000)
    cy.get("table").should("be.visible");
    cy.get("table tr:nth-child(1) td").eq(2).should("contain","1/28/2024");


    //Can edit the selected attendance
    cy.get("table tr:nth-child(1) td").last().scrollIntoView();
    
      cy.get(".material-icons").click()
      cy.get(".dropdown-menu.dropdown-menu-right.show").within(()=>
      {
        cy.contains("Edit").click();
      })
    
    })

});
