// https://on.cypress.io/api

describe('my first test', () => {
	it('visits the app root URL', () => {
		cy.visit('/');

		cy.contains('h1', /you did it!/i);
	});
});