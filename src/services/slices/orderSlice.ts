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
  name: 'orderSlice',
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
    getOrderRequest: (sliceState: TOrderState): boolean =>
      sliceState.orderRequest,
    getOrderData: (sliceState: TOrderState): TOrder | null =>
      sliceState.orderData,
    getOrderModalData: (sliceState: TOrderState): TOrder | null =>
      sliceState.orderModalData
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
      });
  }
});

export const { getOrderRequest, getOrderData, getOrderModalData } =
  orderSlice.selectors;
export const { closeModalOrder, removeItemsConstructor } = orderSlice.actions;
export default orderSlice.reducer;
