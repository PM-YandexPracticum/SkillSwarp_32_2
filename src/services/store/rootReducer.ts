import { combineReducers } from '@reduxjs/toolkit';
import { cardsReducer } from '../slices';

export const rootReducer = combineReducers({
  // Сюда добавлять готовые редьюсеры
  cardsReducer: cardsReducer
});
