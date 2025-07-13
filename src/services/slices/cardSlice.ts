import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard } from 'db/types';

interface TInitialState {
  cards: TCard[];
  filtered: TCard[];
}

const initialState: TInitialState = {
  cards: [],
  filtered: [],
};

const cardsSlice = createSlice({
  name: 'card-slice',
  initialState,
  reducers: {
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    addCard: (state, action: PayloadAction<TCard>) => {
      const newCard: TCard = {
        id: Date.now().toString(),
        userId: action.payload.userId,
        age: action.payload.age,
        city: action.payload.city,
        createdAt: Date.now(),
        description: action.payload.description,
        gender: action.payload.gender,
        learnSkill: action.payload.learnSkill,
        teachSkill: action.payload.teachSkill,
        name: action.payload.name,
        src: action.payload.src,
        likes: []
      };
      state.cards.push(newCard);
    },
    changeCard: (state, action: PayloadAction<Partial<TCard> & { id: string }>) => {
      const changedCard = state.cards.find((card) => card.id === action.payload.id);

      if (!changedCard) return;

      if (action.payload.age) {
        changedCard.age = action.payload.age;
      }
      if (action.payload.city) {
        changedCard.city = action.payload.city;
      }
      if (action.payload.description) {
        changedCard.description = action.payload.description;
      }
      if (action.payload.gender) {
        changedCard.gender = action.payload.gender;
      }
      if (action.payload.learnSkill) {
        changedCard.learnSkill = action.payload.learnSkill;
      }
      if (action.payload.name) {
        changedCard.name = action.payload.name;
      }
      if (action.payload.src) {
        changedCard.src = action.payload.src;
      }
      if (action.payload.teachSkill) {
        changedCard.teachSkill = action.payload.teachSkill;
      }
    },
  },
  // здесь будут санки. я их добавлю когда будет готов API
});

export const { addCard, changeCard, removeCard } = cardsSlice.actions;
export const  cardsReducer = cardsSlice.reducer;

