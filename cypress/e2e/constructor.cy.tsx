import ingredientsMock from '../fixtures/ingredients.json';
// describe('checking app local address access', function () {
//   it('should be available at http://localhost:4000/', () => {
//     cy.visit('http://localhost:4000/');
//   });
// });

describe('testing title text existence', function () {
  // this.beforeEach(() => {
  //   // mock
  //   // cy.fixture('ingredients.json');
  //   // request
  //   cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  //   cy.visit('http://localhost:4000/');
  // });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('');
  });
  it('should say "Соберите бургер"', function () {
    const titleContainer = cy.get(`[data-cy=main-title]`);
    titleContainer.contains('Соберите бургер');
    //   // const burgerConstructorPrice = cy.get(`[data=burger-constructor-price]`);
    //   // const addBtn = cy.get(`[data-cy='add-ingredient-constructor']`);
    //   // const addBtn = cy.get();
    //   // addIngredentConstructorBtn.click();
  });

  it('Add two buns to the list', function () {
    // const bunsList = ingredientsMock.data
    //   .filter((item) => item.type === 'bun')
    //   .map((item) => item.name);
    // console.log(bunsList);
    // cy.get(`[data=add-ingredient-constructor]`).contains('Добавить').click();
    // const addIngredentConstructorBtn = cy.get(
    //   `[data=add-ingredient-constructor]`
    // );
    // cy.get(addIngredentConstructorBtn).contains('Добавить').click();
    // cy.wait(2000);
    // cy.get('[data-cy="add-ingredient-constructor"]')
    //   .contains('Добавить')
    //   .click();
    // cy.get('button').contains('Добавить').click();
    cy.get('[data-cy="burger-bun"]').contains('Добавить').click();
    // cy.get('p').contains('булк').should('exist');
    // cy.get(`[data-cy="burger-bun-top"]`).contains('булк').should('exist');
    // cy.get(`[data-cy="burger-bun-top"]`)
    //   .contains('Краторная булка N-200i')
    //   .should('be.oneOf', bunsList);
    cy.get(`[data-cy="burger-bun-bottom"]`).contains('булк').should('exist');
  });

  it('Add main ingredients', function () {
    cy.get('[data-cy="burger-main"]').contains('Добавить').click();
    cy.get('[data-cy="burger-ingredient"]').contains('котлета').should('exist');
  });

  it('Add souce ingredients', function () {
    cy.get('[data-cy="burger-souce"]').contains('Добавить').click();
    cy.get('[data-cy="burger-ingredient"]').contains('Соус').should('exist');
  });

  it('open/close-btn modal popup with an ingredient', function () {
    cy.get('[data-cy="burger-ingredient-card"]').contains('булк').click();
    cy.get('[data-cy="burger-modal"]').should('exist');
    // cy.get('[data-cy=modal-close-btn]').click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="burger-modal"]').should('not.exist');
  });

  it('open/close-overlay modal popup with an ingredient', function () {
    cy.get('[data-cy="burger-ingredient-card"]').contains('булк').click();
    cy.get('[data-cy="burger-modal"]').should('exist');
    cy.get('[data-cy=modal-close-btn]').click();
    // cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="burger-modal"]').should('not.exist');
  });
});

// describe('making a burger using constructor', () => {

// });
