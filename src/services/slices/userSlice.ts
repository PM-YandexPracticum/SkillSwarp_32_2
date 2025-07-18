import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard, TLoginData, TUser } from '@/shared/global-types';
import {
  checkUserAuth,
  editUserData,
  loginUser as fetchUserData,
  logoutUser,
  registerUser,
} from '@/api';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  likedCards: string[];
  skill: TCard | null;
  offer: TCard | null;
  offersSent: { userId: string; status: string }[];
  offersReceived: { userId: string; status: string }[];
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  likedCards: [],
  skill: null,
  offer: null,
  offersSent: [],
  offersReceived: [],
};

export const loginUser = createAsyncThunk('user/login', async (data: TLoginData, { rejectWithValue }) => {
  try {
    const UserData = await fetchUserData(data.mail, data.password);
    if (!UserData) throw new Error('ошибка в получении данных пользователя');
    return UserData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const registerUserData = createAsyncThunk(
  'user/register',
  async (data: Omit<TUser, 'id'>, { rejectWithValue }) => {
    try {
      const userData = await registerUser(data);
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserData = createAsyncThunk('user/logout', async (__, { rejectWithValue }) => {
  try {
    const data = await logoutUser();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const auhtoriseTry = createAsyncThunk('user/authorise', async (__, { rejectWithValue }) => {
  try {
    const data = await checkUserAuth();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editUser = createAsyncThunk(
  'user/edit',
  async (data: Omit<TUser, 'id'>, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('current-user');
      if (!userId) throw new Error('ошибка в изменении данных пльзователя');
      const userData = await editUserData(data, userId);
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.likedCards = action.payload.likes || [];
        state.offersReceived = action.payload.incoming || [];
        state.offersSent = action.payload.outgoing || [];
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.likedCards = [];
        state.skill = null;
        state.offer = null;
        state.offersSent = [];
        state.offersReceived = [];
      })
      .addCase(logoutUserData.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(auhtoriseTry.fulfilled, (state, action) => {
        state.user = action.payload;
        if (action.payload) {
          state.isAuth = true;
        } else {
          state.isAuth = false;
        }
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const {
  setSkill,
  setOffer,
  addLikedCard,
  removeLikedCard,
  addSentOffer,
  addReceivedOffer,
} = userSlice.actions;

export default userSlice.reducer;
