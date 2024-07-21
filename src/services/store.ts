import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/burgerIngredientsSlice';
import feedSlice from './slices/feedSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import profileSlice from './slices/profileSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice,
  feedSlice: feedSlice,
  burgerConstructorSlice: burgerConstructorSlice,
  profile: profileSlice,
  orderSlice: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   ingredients: ingredientsSlice
  // },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
