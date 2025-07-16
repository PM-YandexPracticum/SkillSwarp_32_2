import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard, TUser } from '@/shared/global-types';
import { loginUser } from '@/api/skill-swap-api';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  likedCards: string[];
  skill: TCard | null;
  offer: TCard | null;
  offersSent: { userId: string; status: string }[];
  offersReceived: { userId: string; status: string }[];
  errorMessage: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  likedCards: [],
  skill: null,
  offer: null,
  offersSent: [],
  offersReceived: [],
  errorMessage: null,
};

export const loginUserThunk = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>(
  'loginUser',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginUser(email, password);
      if (!user) {
        return rejectWithValue('Неверный email или пароль');
      }
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue(`Ошибка при входе: ${error}`);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuth = true;
      state.likedCards = action.payload.likes || [];
      state.offersReceived = action.payload.incoming || [];
      state.offersSent = action.payload.outgoing || [];
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.likedCards = [];
      state.skill = null;
      state.offer = null;
      state.offersSent = [];
      state.offersReceived = [];
    },
    setSkill(state, action: PayloadAction<TCard>) {
      state.skill = action.payload;
    },
    setOffer(state, action: PayloadAction<TCard>) {
      state.offer = action.payload;
    },
    addLikedCard(state, action: PayloadAction<string>) {
      if (!state.likedCards.includes(action.payload)) {
        state.likedCards.push(action.payload);
        // В зависимости от того, как пропишем логику лайков, тут может возникнуть рассинхрон между сервером и отрисовкой. Неплохо бы вернуться в будущем, когда сделают лайки и проверить
        if (state.user) {
          state.user.likes = [...state.likedCards];
        }
      }
    },
    removeLikedCard(state, action: PayloadAction<string>) {
      state.likedCards = state.likedCards.filter((id) => id !== action.payload);
      if (state.user) {
        state.user.likes = [...state.likedCards];
      }
    },
    addSentOffer(state, action: PayloadAction<{ userId: string; status: string }>) {
      state.offersSent.push(action.payload);
    },
    addReceivedOffer(state, action: PayloadAction<{ userId: string; status: string }>) {
      state.offersReceived.push(action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    clearErrorMessage(state) {
      state.errorMessage = null;
    }
  },
  selectors: {
    selectError: (state) => state.errorMessage,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.errorMessage = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Что-то пошло не так';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
      });
    }
});

export const {
  setUser,
  logout,
  setSkill,
  setOffer,
  addLikedCard,
  removeLikedCard,
  addSentOffer,
  addReceivedOffer,
  setError,
  clearErrorMessage
} = userSlice.actions;

export const {
  selectError
} = userSlice.selectors;

export default userSlice.reducer;
