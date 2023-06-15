describe('audio', () => {
	it('play audio', () => {
		cy.visit('/');

		cy.get('.sound-item-name').first().click();
		cy.get('#button-play-big').click();

		cy.wait(49000);

		cy.get('#button-play-small').click();
	});
});