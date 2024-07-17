import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  undefined,
  { rejectValue: string }
>('burgerIngredients/fetchIngredients', async function (): Promise<
  TIngredient[]
> {
  // const response = await fetch(
  //   'https://norma.nomoreparties.space/api/ingredients'
  // );
  // if (!response.ok) rejectWithValue('Error');
  // const data = await response.json();
  // console.log(data);
  // return data;
  return getIngredientsApi();
});

export type TIngredientState = {
  ingredients: TIngredient[];
  error: null | string;
  isLoading: boolean;
};

// https://norma.nomoreparties.space/api/ingredients
// https://norma.nomoreparties.space/api/orders/all
// https://norma.nomoreparties.space/api/ingredients
// https://norma.nomoreparties.space/api/ingredients
// https://norma.nomoreparties.space/api/ingredients
//await fetch(
//   'https://norma.nomoreparties.space/api/orders/all'
// );

const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchIngredients.rejected, (sliceState) => {
        sliceState.error = 'Error';
      })
      .addCase(fetchIngredients.fulfilled, (slcieState, action) => {
        slcieState.ingredients = action.payload;
        slcieState.error = null;
        slcieState.isLoading = false;
      });
  }
});

export default ingredientsSlice.reducer;
