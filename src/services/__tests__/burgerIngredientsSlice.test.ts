import {
  ingredientTypeBun,
  ingredientTypeMain,
  ingredientTypeSouce
} from '../__mocks__/ingredientsData';
import ingredientsSlice, {
  type TIngredientState,
  fetchIngredients
} from '../slices/burgerIngredientsSlice';

describe('Burger ingredient request state status', () => {
  const initialState = {
    ingredients: [],
    error: null,
    isLoading: false
  } as TIngredientState;

  it('should handle status pending for fetchIngredients API call', () => {
    const sliceState = ingredientsSlice(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for fetchIngredients API call', () => {
    const sliceState = ingredientsSlice(initialState, {
      type: fetchIngredients.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Error'
    });
  });

  it('should handle status fulfilled for fetchIngredients API call', () => {
    const ingredients = [
      ingredientTypeSouce,
      ingredientTypeMain,
      ingredientTypeBun
    ];
    const sliceState = ingredientsSlice(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      ingredients: ingredients
    });
  });
});
