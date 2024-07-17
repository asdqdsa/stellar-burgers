import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/burgerIngredientsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  // reducer: {
  //   ingredients: ingredientsSlice
  // },
  devTools: process.env.NODE_ENV !== 'production'
});

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
