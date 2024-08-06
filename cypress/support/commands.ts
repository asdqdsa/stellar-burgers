/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      clickElementWith(_options: { el: string; text: string }): Chainable<void>;
      openCloseModal(_options: {
        el: string;
        text: string;
        modal: string;
        closeModalEl: string;
        isForce?: boolean;
      }): Chainable<void>;
    }
  }
}

Cypress.Commands.add('clickElementWith', ({ el, text }) => {
  cy.get(el).contains(text).click();
});

Cypress.Commands.add(
  'openCloseModal',
  ({ el, text, modal, closeModalEl, isForce = false }) => {
    cy.clickElementWith({ el, text });
    cy.get(modal).should('exist');
    cy.get(closeModalEl).click({ force: isForce });
    cy.get(modal).should('not.exist');
  }
);

export {};
