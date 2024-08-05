import '../support/commands';
const burgerIngredient = '[data-cy="burger-ingredient"]';
const modal = '[data-cy="burger-modal"]';

describe('E2E atomic cases', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('');
  });

  it('Should say "Соберите бургер"', function () {
    cy.get(`[data-cy=main-title]`).contains('Соберите бургер');
  });

  it('Add two buns to the list', function () {
    cy.get('[data-cy="burger-bun"]').contains('Добавить').click();
    cy.get(`[data-cy="burger-bun-bottom"]`).contains('булк').should('exist');
  });

  it('Add main ingredients', function () {
    cy.get('[data-cy="burger-main"]').contains('Добавить').click();
    cy.get(burgerIngredient).contains('котлета').should('exist');
  });

  it('Add souce ingredients', function () {
    cy.get('[data-cy="burger-souce"]').contains('Добавить').click();
    cy.get(burgerIngredient).contains('Соус').should('exist');
  });

  describe('Open/Close popup with ingredient', () => {
    const options = {
      el: '[data-cy="burger-ingredient-card"]',
      text: 'булк',
      modal,
      closeModalEl: '[data-cy="modal-overlay"]',
      isForce: true
    };

    it('Open & close by pressing button', function () {
      cy.openCloseModal(options);
    });

    it('Open & close by clicking overlay', function () {
      cy.openCloseModal(options);
    });
  });
});

describe('Creating order user case', function () {
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

    cy.get(modal).as('modal').contains('777').should('exist');
    cy.get('[data-cy=modal-close-btn]').click();
    cy.get('@modal').should('not.exist');

    cy.get(`[data-cy="burger-bun-top"]`).should('not.exist');
    cy.get(`[data-cy="burger-bun-bottom"]`).should('not.exist');
    cy.get(burgerIngredient).contains('котлета').should('not.exist');
    cy.get(burgerIngredient).contains('Соус').should('not.exist');
  });
});
