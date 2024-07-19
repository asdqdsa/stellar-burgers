import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

// export type TIngredient = {
//   _id: string;
//   name: string;
//   type: string;
//   proteins: number;
//   fat: number;
//   carbohydrates: number;
//   calories: number;
//   price: number;
//   image: string;
//   image_large: string;
//   image_mobile: string;
// };

// export type TConstructorIngredient = TIngredient & {
//   id: string;
// };
/** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
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
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
