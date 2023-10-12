// ***********************************************
// this example 'commands.js' shows you how to
// create various custom-commands and overWrite
// existing commands
//
// for more comprehensive examples of custom-
// commands, please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- this is a parent command --
// Cypress.Commands.add('logIn', (eMail, passWord) => {...});
//
//
// -- this is a child command --
// Cypress.Commands.add('drag', {prevSubject: 'element'}, (subject, options) => {...});
//
//
// -- this is a dual command --
// Cypress.Commands.add('dismiss', {prevSubject: 'optional'}, (subject, options) => {...});
//
//
// -- this will overWrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFunction, URL, options) => {...});