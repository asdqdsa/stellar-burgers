import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  constructorItems: {
    bun: null | TIngredient;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (sliceState, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            sliceState.constructorItems.bun = action.payload;
            break;
          default:
            sliceState.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => ({ payload: { ...ingredient, id: nanoid() } })
    },

    removeIngredient(
      sliceState,
      action: PayloadAction<TConstructorIngredient>
    ) {
      sliceState.constructorItems.ingredients =
        sliceState.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },

    removeAllIngredients(sliceState) {
      sliceState.constructorItems.ingredients = [];
      sliceState.constructorItems.bun = null;
    },

    moveIngredient(
      sliceState,
      action: PayloadAction<{ index: number; move: number }>
    ) {
      [
        sliceState.constructorItems.ingredients[action.payload.index],
        sliceState.constructorItems.ingredients[
          action.payload.index - action.payload.move
        ]
      ] = [
        sliceState.constructorItems.ingredients[
          action.payload.index - action.payload.move
        ],
        sliceState.constructorItems.ingredients[action.payload.index]
      ];
    }
  },
  selectors: {
    getConstructorItems: (sliceState) => sliceState.constructorItems
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  removeAllIngredients
} = burgerConstructorSlice.actions;
export const { getConstructorItems } = burgerConstructorSlice.selectors;
export default burgerConstructorSlice.reducer;
