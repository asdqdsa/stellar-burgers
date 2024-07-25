import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { TOrder } from '@utils-types';

export const fetchOrderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/fetchOrderBurger',
  orderBurgerApi
);

export const fetchOrdersUser = createAsyncThunk<TOrder[], undefined>(
  'order/fetchOrdersUser',
  getOrdersApi
);

export const fetchOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  'order/fetchOrderByNumber',
  getOrderByNumberApi
);

type TOrderState = {
  orderRequest: boolean;
  orderData: TOrder | null;
  orderModalData: TOrder | null;
  error: null | string;
  isLoading: boolean;
  ordersByUser: TOrder[];
};

const initialState: TOrderState = {
  orderRequest: false,
  orderData: null,
  orderModalData: null,
  ordersByUser: [],
  error: null,
  isLoading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModalOrder: (sliceState) => {
      sliceState.orderModalData = null;
    },
    removeItemsConstructor: (sliceState) => {
      sliceState.orderData = initialState.orderData;
    }
  },
  selectors: {
    getOrderRequest: (sliceState) => sliceState.orderRequest,
    getOrderData: (sliceState) => sliceState.orderData,
    getOrderModalData: (sliceState) => sliceState.orderModalData,
    getOrdersByUser: (sliceState) => sliceState.ordersByUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
        sliceState.orderRequest = true;
      })
      .addCase(fetchOrderBurger.rejected, (sliceState) => {
        sliceState.error = 'Error order';
        sliceState.orderRequest = false;
      })
      .addCase(fetchOrderBurger.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = null;
        sliceState.orderRequest = false;
        sliceState.orderData = action.payload.order;
        sliceState.orderModalData = action.payload.order;
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
      })
      .addCase(fetchOrderByNumber.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (sliceState) => {
        sliceState.error = 'Error profile order';
      })
      .addCase(fetchOrderByNumber.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = null;
        sliceState.orderData = action.payload.orders[0];
      });
  }
});

export const {
  getOrderRequest,
  getOrderData,
  getOrderModalData,
  getOrdersByUser
} = orderSlice.selectors;
export const { closeModalOrder, removeItemsConstructor } = orderSlice.actions;
export default orderSlice.reducer;
