import { feedData } from '../__mocks__/feedData';

import feedSlice, { fetchFeed, initialState } from '../slices/feedSlice';

describe('Feed orders request state status', () => {
  it('should handle status pending for fetchFeed API call', () => {
    const sliceState = feedSlice(initialState, {
      type: fetchFeed.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for fetchFeed API call', () => {
    const sliceState = feedSlice(initialState, {
      type: fetchFeed.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: 'Error fetching feed'
    });
  });

  it('should handle status fullfilled for fetchFeed API call', () => {
    const { orders, totalToday, total } = feedData;
    const sliceState = feedSlice(initialState, {
      type: fetchFeed.fulfilled.type,
      payload: feedData
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      orders: orders,
      totalToday: totalToday,
      total: total
    });
  });
});
