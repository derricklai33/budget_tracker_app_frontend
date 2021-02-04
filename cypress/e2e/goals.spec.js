describe("goals page should be a protected route", () => {
  it("should not an allow a logged out user to the goals page", () => {
    cy.visit("/admin/goals");
    cy.get(".cc2f705b6").should("exist");
  });
  it("should allow the user to login with username and password", () => {
    cy.get("#username").type(Cypress.env("auth_username"));
    cy.get("#password").type(Cypress.env("auth_password"));
    cy.get(".caa50eb76").click();
  });
});

describe("editing goals card", () => {
  it("should allow the user to change the name of the card", () => {
    cy.visit("/admin/goals");

    cy.get(
      '[data-rbd-draggable-id="column-1"] > .makeStyles-card-132 > .makeStyles-cardHeader-136 > .MuiGrid-root > .MuiInputBase-root > .MuiInputBase-input'
    )
      .type("{backspace}{backspace}{backspace}{backspace}{backspace}")
      .type("New")
      .click("topLeft")
      .should("have.value", "New");
    cy.get(
      '[data-rbd-draggable-id="column-1"] > .makeStyles-card-132 > .makeStyles-cardHeader-136 > .MuiGrid-root > .MuiInputBase-root > .MuiInputBase-input'
    ).should("have.value", "New");
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should allow the user to type a goal", () => {
    cy.get(
      '[data-rbd-draggable-id="column-1"] > .makeStyles-card-132 > .makeStyles-cardBody-160 > .MuiButtonBase-root'
    ).click();
    cy.get(
      ".MuiListItem-root > .MuiGrid-root > .MuiInputBase-root > .MuiInputBase-input"
    )
      .last()
      .type("goal");
    cy.get("body").click("topLeft");
    cy.get(
      ".MuiListItem-root > .MuiGrid-root > .MuiInputBase-root > .MuiInputBase-input"
    ).should("have.value", "goal");
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should not allow the user to enter a blank goal on click away", () => {
    let length = 0;

    cy.get(
      '[data-rbd-draggable-id="column-1"] > .makeStyles-card-132 > .makeStyles-cardBody-160 > .MuiButtonBase-root'
    ).click();

    cy.get(
      '[data-rbd-draggable-id="column-1"] > :nth-child(1) > .makeStyles-cardBody-160 > .MuiList-root'
    )
      .children()
      .then(($children) => {
        length = $children.length;
      })
      .get("body")
      .click("topLeft")
      .get(
        '[data-rbd-draggable-id="column-1"] > :nth-child(1) > .makeStyles-cardBody-160 > .MuiList-root'
      )
      .children()
      .then(($children) => {
        expect($children).to.have.length(length - 1);
      });
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should not allow the user to enter a blank goal on enter press", () => {
    let length = 0;
    cy.get(
      '[data-rbd-draggable-id="column-1"] > :nth-child(1) > .makeStyles-cardBody-160 > .MuiList-root'
    )
      .children()
      .then(($children) => {
        length = $children.length;
      })
      .get(
        '[data-rbd-draggable-id="column-1"] > :nth-child(1) > .makeStyles-cardBody-160 > .MuiButtonBase-root'
      )
      .click();
    cy.get(
      ".MuiListItem-root > .MuiGrid-root > .MuiInputBase-root > .MuiInputBase-input"
    )
      .last()
      .type("{enter}")
      .should("have.value", "")
      .get("body")
      .click("topLeft")
      .get(
        '[data-rbd-draggable-id="column-1"] > :nth-child(1) > .makeStyles-cardBody-160 > .MuiList-root'
      )
      .children()
      .then(($children) => {
        expect($children).to.have.length(length);
      });
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should allow the user to edit the goal description", () => {
    cy.get(".makeStyles-editGrid-171 > div > .MuiSvgIcon-root")
      .last()
      .click()
      .get(":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root")
      .type("test value{enter}")
      .get("#outlined-multiline-static")
      .should("have.value", "test value\n");
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should allow the user to edit the percentage complete", () => {
    cy.get('[data-index="1"]').click();
    cy.get(".MuiSlider-thumb")
      .invoke("attr", "aria-valuenow")
      .should("contain", "10");
    cy.get('[data-index="5"]').click();
    cy.get(".MuiSlider-thumb")
      .invoke("attr", "aria-valuenow")
      .should("contain", "50");
    cy.get("body").click("topLeft");
  });

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  it("should persist the data from creating the last goal", () => {
    cy.get(".makeStyles-editGrid-171 > div > .MuiSvgIcon-root")
      .last()
      .click()
      .get(":nth-child(2) > .MuiFormControl-root > .MuiInputBase-root")
      .get("#outlined-multiline-static")
      .should("have.value", "test value\n");
    cy.get(".MuiSlider-thumb")
      .invoke("attr", "aria-valuenow")
      .should("contain", "50");
    cy.get("body").click("topLeft");
  });
});

describe("logging out the user", () => {
  it("should allow the user to logout of the application", () => {
    cy.get(
      ".PrivateHiddenCss-smDown-34 > :nth-child(1) > :nth-child(4) > .MuiButtonBase-root > .MuiButton-label > .MuiSvgIcon-root > path"
    ).click();
    cy.get("#profile-menu-list-grow > .MuiList-root > :nth-child(4)").click();
    cy.get(".makeStyles-buttonContainer-4 > :nth-child(1)").should("exist");
  });
});
