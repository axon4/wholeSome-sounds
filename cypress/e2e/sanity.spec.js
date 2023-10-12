describe('sanity', () => {
	it('navigate to home-page', () => {
		cy.visit('/');

		cy.contains('#header a:first-child', 'WholeSome Sounds');
	});
});