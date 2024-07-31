describe('checking app local address access', function () {
  it('should be available at http://localhost:4000/', function () {
    cy.visit('http://localhost:4000/');
  });
});
