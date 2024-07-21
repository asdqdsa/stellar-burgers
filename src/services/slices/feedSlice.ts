import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

//await fetch(
//   'https://norma.nomoreparties.space/api/orders/all'
// );

export const fetchFeed = createAsyncThunk<TOrdersData>(
  'feed/fetchFeed',
  async (): Promise<TOrdersData> => getFeedsApi()
);

type TFeedState = {
  isLoading: boolean;
  error: null | string;
} & TOrdersData;

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchFeed.rejected, (sliceState) => {
        sliceState.isLoading = false;
        sliceState.error = 'Error';
      })
      .addCase(fetchFeed.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.error = null;
        sliceState.orders = action.payload.orders;
        sliceState.totalToday = action.payload.totalToday;
        sliceState.total = action.payload.total;
      });
  }
});

export default feedSlice.reducer;
