import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi,
  TNewOrderResponse
} from '@api';
import { TOrder } from '@utils-types';

export const fetchOrderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/fetchOrderBurger',
  async (order: string[]): Promise<TNewOrderResponse> => orderBurgerApi(order)
);

type TOrderState = {
  orderRequest: boolean;
  orderData: TOrder | null;
  error: null | string;
  isLoading: boolean;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderData: null,
  error: null,
  isLoading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (sliceState) => {
        sliceState.error = 'Error order';
      })
      .addCase(fetchOrderBurger.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = null;
        sliceState.orderRequest = true;
        sliceState.orderData = action.payload.order;
      });
  }
});

export default orderSlice.reducer;
