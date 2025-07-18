import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard, TUser } from '@/shared/global-types';
import { checkUserAuth, loginUser, registerUser } from '@/api/skill-swap-api';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  likedCards: string[];
  skill: TCard | null;
  offer: TCard | null;
  offersSent: { userId: string; status: string }[];
  offersReceived: { userId: string; status: string }[];
  registrationData: Partial<TUser & TCard>;
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
  registrationData: {},
  errorMessage: null,
};

export const registerUserThunk = createAsyncThunk<
  TUser,
  TUser,
  { rejectValue: string }
>('registerUserThunk', async (userData, { rejectWithValue }) => {
  try {
    const user = await registerUser(userData);
    return user;
  } catch (error) {
    return rejectWithValue(`Ошибка при регистрации: ${error}`);
  }
});

export const loginUserThunk = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>(
  'loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUser(email, password);
      if (!user) {
        return rejectWithValue('Неверный email или пароль');
      }
      return user;
    } catch (error) {
      return rejectWithValue(`Ошибка при входе: ${error}`);
    }
  }
);

export const checkAuthThunk = createAsyncThunk<
  TUser | null,
  void,
  { rejectValue: string }
>('checkAuthThunk', async (_, { rejectWithValue }) => {
  try {
    const user = await checkUserAuth();
    if (user) {
      const user = await checkUserAuth();
      return user;
    }
    return null;
  } catch (error) {
    return rejectWithValue(`Ошибка при проверке авторизации: ${error}`);
  }
});

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
    setRegistrationStepData(state, action: PayloadAction<Partial<TUser>>) {
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
      };
    },
    clearRegistrationData(state) {
      state.registrationData = {};
    },
  },
  selectors: {
    selectRegistrationData: (state) => state.registrationData, 
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
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.errorMessage = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.registrationData = {};
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Ошибка регистрации';
      })
      .addCase(checkAuthThunk.pending, (state) => {
        state.errorMessage = null;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Ошибка авторизации';
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
  setRegistrationStepData,
  clearRegistrationData,
} = userSlice.actions;

export const {
  selectRegistrationData,
  selectError
} = userSlice.selectors;

export default userSlice.reducer;
