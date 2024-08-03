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

describe('Creating order', function () {
  beforeEach(function () {
    cy.visit('');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('order');
    global.localStorage.setItem(
      'refreshToken',
      JSON.stringify(
        '16d70cd6d2123172f233848d1ea5574ea48da860fe1acc4163dc31327bd4bdaede732e8826d68681'
      )
    );
    cy.setCookie(
      'accessToken',
      JSON.stringify(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWE4NmQ2MTE5ZDQ1MDAxYjRmYTBkNSIsImlhdCI6MTcyMjY3NzMwNCwiZXhwIjoxNzIyNjc4NTA0fQ.D8teGU2Mv4WBdiuY4X2sN5Lsk0-zj0nL9PL0t6gNm2o'
      )
    );
    cy.visit('');
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('Create order', function () {
    cy.get('[data-cy="burger-bun"]').contains('Добавить').click();
    cy.get('[data-cy="burger-main"]').contains('Добавить').click();
    cy.get('[data-cy="burger-souce"]').contains('Добавить').click();
    cy.get('[data-cy="burger-create-order"]')
      .contains('Оформить заказ')
      .click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', {
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ]
      });

    cy.get('[data-cy="burger-modal"]').contains('777').should('exist');
    cy.get('[data-cy=modal-close-btn]').click();
    cy.get('[data-cy="burger-modal"]').should('not.exist');

    cy.get(`[data-cy="burger-bun-top"]`).should('not.exist');
    cy.get(`[data-cy="burger-bun-bottom"]`).should('not.exist');
    cy.get('[data-cy="burger-ingredient"]')
      .contains('котлета')
      .should('not.exist');
    cy.get('[data-cy="burger-ingredient"]')
      .contains('Соус')
      .should('not.exist');
  });
});
