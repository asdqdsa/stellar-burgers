import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: {
    price: number;
  };
  ingredients: TIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: {
    price: 0
  },
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {}
});
