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

export const fetchOrdersUser = createAsyncThunk<TOrder[], undefined>(
  'order/fetchOrdersUser',
  async (): Promise<TOrder[]> => getOrdersApi()
);

type TOrderState = {
  orderRequest: boolean;
  orderData: TOrder | null;
  error: null | string;
  isLoading: boolean;
  ordersByUser: TOrder[];
};

const initialState: TOrderState = {
  orderRequest: false,
  orderData: null,
  ordersByUser: [],
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
      })
      .addCase(fetchOrdersUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchOrdersUser.rejected, (sliceState) => {
        sliceState.error = 'Error order';
      })
      .addCase(fetchOrdersUser.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.ordersByUser = action.payload;
      });
  }
});

export default orderSlice.reducer;
