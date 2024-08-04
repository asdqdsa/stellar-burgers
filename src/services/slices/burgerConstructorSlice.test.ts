import {
  addIngredient,
  removeIngredient,
  removeAllIngredients,
  moveIngredient,
  type TBurgerConstructorState
} from './burgerConstructorSlice';
import burgerConstructorSlice from './burgerConstructorSlice';
import {
  ingredientTypeBun,
  ingredientTypeMain,
  ingredientTypeSouce
} from '../__test__/ingredientsMockData';

describe('Burger constructor functionality', () => {
  const initialState = {
    constructorItems: { bun: null, ingredients: [] }
  } as TBurgerConstructorState;

  it('should add outter ingredient type bun', () => {
    const ingredient = ingredientTypeBun;
    const sliceState = burgerConstructorSlice(
      initialState,
      addIngredient(ingredient)
    );

    const { bun } = sliceState.constructorItems;
    expect(bun).toEqual({ ...ingredient, id: expect.any(String) });
  });

  it('should add inner ingredient type main', () => {
    const ingredient = ingredientTypeMain;
    const sliceState = burgerConstructorSlice(
      initialState,
      addIngredient(ingredient)
    );

    const [main] = sliceState.constructorItems.ingredients;
    expect(main).toEqual({ ...ingredient, id: expect.any(String) });
  });

  it('should remove inner ingredient', () => {
    const ingredient = { ...ingredientTypeSouce, id: '1' };
    const initialState = {
      constructorItems: { bun: null, ingredients: [ingredient] }
    } as TBurgerConstructorState;

    const sliceState = burgerConstructorSlice(
      initialState,
      removeIngredient(ingredient)
    );

    const inner = sliceState.constructorItems.ingredients;
    expect(inner).toEqual([]);
  });

  it('should move inner ingredient down', () => {
    const ingredientAbove = { ...ingredientTypeMain, id: '1' };
    const ingredientBellow = { ...ingredientTypeSouce, id: '2' };

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredientAbove, ingredientBellow]
      }
    } as TBurgerConstructorState;

    const sliceState = burgerConstructorSlice(
      initialState,
      moveIngredient({ index: 0, move: -1 })
    );

    const { ingredients } = sliceState.constructorItems;
    expect(ingredients).toEqual([ingredientBellow, ingredientAbove]);
  });

  it('should move inner ingredient up', () => {
    const ingredientAbove = { ...ingredientTypeMain, id: '1' };
    const ingredientBellow = { ...ingredientTypeSouce, id: '2' };

    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredientAbove, ingredientBellow]
      }
    } as TBurgerConstructorState;

    const sliceState = burgerConstructorSlice(
      initialState,
      moveIngredient({ index: 1, move: 1 })
    );

    const { ingredients } = sliceState.constructorItems;
    expect(ingredients).toEqual([ingredientBellow, ingredientAbove]);
  });

  it('should clear burger constructor list', () => {
    const ingredientBun = { ...ingredientTypeBun, id: '1' };
    const ingredientMain = { ...ingredientTypeMain, id: '2' };
    const ingredientSouce = { ...ingredientTypeSouce, id: '3' };
    const initialState = {
      constructorItems: {
        bun: ingredientBun,
        ingredients: [ingredientMain, ingredientSouce]
      }
    } as TBurgerConstructorState;

    const sliceState = burgerConstructorSlice(
      initialState,
      removeAllIngredients()
    );

    const constructor = sliceState.constructorItems;
    expect(constructor).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
