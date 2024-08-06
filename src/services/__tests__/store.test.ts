import { rootReducer } from '../store';
import ingredientsSlice from '../slices/burgerIngredientsSlice';
import feedSlice from '../slices/feedSlice';
import burgerConstructorSlice from '../slices/burgerConstructorSlice';
import profileSlice from '../slices/profileSlice';
import orderSlice from '../slices/orderSlice';

describe('Init store/rootReducer', () => {
  it('checks correct initial state for each slice', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: ingredientsSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: burgerConstructorSlice(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      profile: profileSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      order: orderSlice(undefined, { type: 'UNKNOWN_ACTION' })
    });
  });
});
