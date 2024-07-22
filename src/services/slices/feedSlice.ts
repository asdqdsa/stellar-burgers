import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

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
  selectors: {
    getFeed: (sliceState) => sliceState,
    getFeedOrders: (sliceState) => sliceState.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchFeed.rejected, (sliceState) => {
        sliceState.isLoading = false;
        sliceState.error = 'Error fetching feed';
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

export const { getFeed, getFeedOrders } = feedSlice.selectors;
export default feedSlice.reducer;
