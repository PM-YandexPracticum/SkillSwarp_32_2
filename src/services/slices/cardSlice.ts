import { fetchCardsData } from '@/api';
import type { TCard } from '@/shared/global-types';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const getCards = createAsyncThunk('cards/get', fetchCardsData);

interface TInitialState {
  cards: TCard[];
  filtered: TCard[];
  loading: boolean;
  error: string | null;
}

const initialState: TInitialState = {
  cards: [],
  filtered: [],
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  selectors: {
    getCardsState: (state) => state.cards,
    getCardsLoadingState: (state) => state.loading,
  },
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
        fullDescription: action.payload.fullDescription,
        gender: action.payload.gender,
        learnSkill: action.payload.learnSkill,
        teachSkill: action.payload.teachSkill,
        name: action.payload.name,
        src: action.payload.src,
        likes: [],
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
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { getCardsState, getCardsLoadingState } = cardsSlice.selectors;
export const { addCard, changeCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
