import { orderMockData } from '../__mocks__/orderMockData';
import orderSlice, {
  type TOrderState,
  removeItemsConstructor,
  fetchOrderBurger,
  fetchOrdersUser,
  fetchOrderByNumber
} from '../slices/orderSlice';
import { ordersByUserData } from '../__mocks__/orderByUser';
import { orderByNumber } from '../__mocks__/orderbyNumber';

describe('Order slice functionality & request state status', () => {
  const initialState = {
    orderRequest: false,
    orderData: null,
    orderModalData: null,
    ordersByUser: [],
    error: null,
    isLoading: false
  } as TOrderState;

  it('should handle status fulfilled for fetchOrderBurger API call', () => {
    const orderData = orderMockData.order;
    const sliceState = orderSlice(initialState, {
      type: fetchOrderBurger.fulfilled.type,
      payload: orderMockData
    });

    expect(sliceState).toEqual({
      ...initialState,
      orderRequest: false,
      isLoading: false,
      error: null,
      ordersByUser: [],
      orderData: orderData,
      orderModalData: orderData
    });
  });

  it('should handle status pending for fetchOrderBurger API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrderBurger.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      orderRequest: true,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for fetchOrderBurger API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrderBurger.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      orderRequest: false,
      isLoading: true,
      error: 'Error order'
    });
  });

  it('should handle status fulfilled for fetchOrdersUser API call', () => {
    const ordersByUser = ordersByUserData.orders;
    const sliceState = orderSlice(initialState, {
      type: fetchOrdersUser.fulfilled.type,
      payload: ordersByUser
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      ordersByUser: ordersByUser
    });
  });

  it('should handle status pending for fetchOrdersUser API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrdersUser.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: false,
      error: null
    });
  });

  it('should handle status rejected for fetchOrdersUser API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrdersUser.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      orderRequest: false,
      error: 'Error order'
    });
  });

  it('should handle status fulfilled for fetchOrderByNumber API call', () => {
    const orderData = orderByNumber.orders[0];
    const sliceState = orderSlice(initialState, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: orderByNumber
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      error: null,
      orderData: orderData
    });
  });

  it('should handle status pending for fetchOrderByNumber API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrderByNumber.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for fetchOrderByNumber API call', () => {
    const sliceState = orderSlice(initialState, {
      type: fetchOrderByNumber.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: 'Error order'
    });
  });

  it('should remove items from burger constructor list that were ordered', () => {
    const state = { ...initialState, orderData: ordersByUserData.orders[0] };
    const sliceState = orderSlice(state, removeItemsConstructor());
    expect(sliceState).toEqual({ ...state, orderData: null });
  });
});
