import { Runnable } from "mocha"

describe('Login', () => {
  beforeEach(() => cy.visit('https://daily-happiness.netlify.app/'));
  beforeEach(() => cy.on('uncaught:exception', (e, runnable) => {
    if (e.message.includes('The play() request was interrupted')) return false
  }))

  it('successfully logs in as user with enter', () => {
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('testtest').type('{enter}');
    cy.get('._logout-btn_1ry33_77').should('exist');
  })

  it('logs out on button click', () => {
    cy.get('._logout-btn_1ry33_77').click()});

  it('successfully logs in as user with button click', () => {
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('testtest').type('{enter}');
    cy.get('._logout-btn_1ry33_77').should('exist');
    cy.get('._logout-btn_1ry33_77').click();
  })

  it('successfully swaps between login and signup pages', () => {
    //login > signup
    cy.get('._signup-container_h9ptn_79 > :nth-child(1)').click();
    cy.get('[for="displayName"]').should("be.visible");

    //signup > login
    cy.get('._signup-container_h9ptn_79 > button').click();
    cy.get('[for="displayName"]').should("not.exist");
  })
})