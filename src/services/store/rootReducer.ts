import { combineReducers } from '@reduxjs/toolkit';
import { cardsReducer } from '../slices';
import userReducer from '../slices/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  cardsReducer: cardsReducer,
});
