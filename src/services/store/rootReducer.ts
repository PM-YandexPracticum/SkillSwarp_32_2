import { combineReducers } from '@reduxjs/toolkit';
//import { cardsReducer } from '../slices';
import cardsReducer from '../slices/cardSlice';
import userReducer from '../slices/userSlice';
import filterReducer from '../slices/filterSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  cards: cardsReducer,
  filter: filterReducer,
});
