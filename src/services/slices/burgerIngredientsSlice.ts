import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[], undefined>(
  'burgerIngredients/fetchIngredients',
  async (): Promise<TIngredient[]> => getIngredientsApi()
);

export type TIngredientState = {
  ingredients: TIngredient[];
  error: null | string;
  isLoading: boolean;
};

const initialState: TIngredientState = {
  ingredients: [],
  error: null,
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (sliceState) => sliceState.ingredients,
    isLoadingIngredients: (sliceState) => sliceState.isLoading
  },
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

export const { getIngredients, isLoadingIngredients } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
