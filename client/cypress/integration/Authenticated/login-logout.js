import '@testing-library/cypress/add-commands';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe ('End to end testing with Cypress', () => {

  // it('logs in', () => {
  //   cy.visit('http://localhost:3000');
  //   cy.findByRole('button', {  name: /log in/i}).click();
  //   cy.findByRole('textbox', {  name: /email/i}).clear().type('cypress@curbside.com');
  //   cy.findByLabelText(/password/i).clear().type('cypress');
  //   cy.findByRole('button', {  name: /log in/i}).click();
  // })

  it('add a new listing', () => {
    cy.visit('http://localhost:3000');
    cy.get('#root > div > div > div:nth-child(3) > a:nth-child(3) > i').click();
    cy.findByLabelText('Title', {selector: 'input'}).click({force: true}).type('Test title');
    cy.findByLabelText('Price', {selector: 'input'}).click({force: true}).type(11.22);
    cy.get('.form-select').select('Used');
    cy.findByLabelText('Description', {selector: 'textarea'}).type('Test item description');
    cy.findByLabelText('Photos').selectFile('cypress/fixtures/testPicture.png');
    cy.findByLabelText('Categories', {selector: 'input'}).type('moto');
  })

  // it('logs out', () => {
  //   // cy.visit('http://localhost:3000');
  //   cy.get('#root > div > div > div:nth-child(3) > button > i').click();
  //   cy.findByRole('button', {  name: /log out/i}).click();
  // })
})