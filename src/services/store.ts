import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/burgerIngredientsSlice';
import feedSlice from './slices/feedSlice';

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsSlice,
  feedSlice: feedSlice
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

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
