import { combineReducers, configureStore } from '@reduxjs/toolkit';

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
  ingredients: ingredientsSlice,
  feed: feedSlice,
  burgerConstructor: burgerConstructorSlice,
  profile: profileSlice,
  order: orderSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
