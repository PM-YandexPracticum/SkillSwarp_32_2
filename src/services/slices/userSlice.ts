import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard, TUser } from '@/shared/global-types';
import {
  checkRegistration,
  checkUserAuth,
  loginUser,
  postDislikeCard,
  postLikeCard,
  postSaveLikedCard,
  registerUser,
} from '@/api/skill-swap-api';

interface UserState {
  user: TUser;
  isAuth: boolean;
  registrationData: Partial<TUser & TCard>;
  errorMessage: string | null;
  registrationError: boolean;
}

const initialState: UserState = {
  user: {
    id: '',
    gender: 'male',
    userId: '',
    name: '',
    city: 'Москва',
    age: 0,
    mail: '',
    password: '',
    description: '',
    incoming: [],
    outgoing: [],
    image: '/#',
    likes: [],
  },
  isAuth: false,
  registrationData: {},
  errorMessage: null,
  registrationError: false
};

export const registerUserThunk = createAsyncThunk<TUser, TUser, { rejectValue: string }>(
  'registerUserThunk',
  async (userData, { rejectWithValue }) => {
    try {
      const user = await registerUser(userData);
      return user;
    } catch (error) {
      return rejectWithValue(`Ошибка при регистрации: ${error}`);
    }
  }
);

export const loginUserThunk = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: string }
>('loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const user = await loginUser(email, password);
    if (!user) {
      return rejectWithValue('Неверный email или пароль');
    }
    return user;
  } catch (error) {
    return rejectWithValue(`Ошибка при входе: ${error}`);
  }
});

export const checkAuthThunk = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'checkAuthThunk',
  async (_, { rejectWithValue }) => {
    try {
      const user = await checkUserAuth();
      if (!user) {
        return rejectWithValue('Неверный email или пароль');
      }
      return user;
    } catch (error) {
      return rejectWithValue(`Ошибка при проверке авторизации: ${error}`);
    }
  }
);

export const checkUserExist = createAsyncThunk<boolean, { mail: string }, { rejectValue: string }>(
  'auth/checkUserExist',
  async ({ mail }, { rejectWithValue }) => {
    try {
      const userData = await checkRegistration(mail); // просто возвращаем true/false

      if (userData.length == 0) {
        console.log(userData[0]);
        return false;
      }
      return true;
    } catch (error) {
      return rejectWithValue(`Ошибка при проверке пользователя: ${error}`);
    }
  }
);

export const likeCardThunk = createAsyncThunk<
  void,
  { cardId: string; userId: string },
  { rejectValue: string }
>('likeCardThunk', async ({ cardId, userId }, { rejectWithValue }) => {
  try {
    // console.log('Текущий пользователь',userId, 'Карточка которую тыкаем',cardId)
    await postLikeCard(cardId, userId);
  } catch (error) {
    return rejectWithValue(`Ошибка при регистрации: ${error}`);
  }
});

export const disLikeCardThunk = createAsyncThunk<
  void,
  { cardId: string; userId: string },
  { rejectValue: string }
>('disLikeCardThunk', async ({ cardId, userId }, { rejectWithValue }) => {
  try {
    // console.log('Текущий пользователь',userId, 'Карточка которую тыкаем',cardId)
    await postDislikeCard(cardId, userId);
  } catch (error) {
    return rejectWithValue(`Ошибка при регистрации: ${error}`);
  }
});

export const saveLikedCardThunk = createAsyncThunk<
 string[],
  { userData: TUser; userId: string },
  { rejectValue: string }
>('saveLikeCardThunk', async ({ userData, userId }, { rejectWithValue }) => {
  try {
    const result = await postSaveLikedCard(userData, userId);
    return result.likes;
  } catch (error) {
    return rejectWithValue(`Ошибка при регистрации: ${error}`);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = initialState.user;
      state.isAuth = false;
      localStorage.removeItem('current-user');
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
    toggleLike(state, action: PayloadAction<Partial<string>>) {
      if (state.user.likes.includes(action.payload)) {
        return {
          ...state,
          user: {
            ...state.user,
            likes: state.user.likes.filter((id) => id !== action.payload),
          },
        };
      } else {
        state.user.likes = [...state.user.likes, action.payload];
      }
    },
  },
  selectors: {
    selectUserData: (state) => state.user,
    selectRegistrationData: (state) => state.registrationData,
    selectError: (state) => state.errorMessage,
    selectRegistrationError: (state) => state.registrationError,
    selectLikes: (state) => state.user?.likes,
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
      })
      .addCase(checkUserExist.fulfilled, (state, action) => {
        state.registrationError = action.payload;
        console.log(state.registrationError);
      })
      .addCase(checkUserExist.pending, () => {
        // написать что-то и сделать что то со state
      })
      .addCase(checkUserExist.rejected, () => {
        // написать что-то и сделать что то со state
      })
      .addCase(saveLikedCardThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user.likes = action.payload;
      });
  },
});

export const { logout, setRegistrationStepData, clearRegistrationData, toggleLike } = userSlice.actions;

export const {
  selectRegistrationData,
  selectError,
  selectUserData,
  selectRegistrationError,
  selectLikes,
} = userSlice.selectors;

export default userSlice.reducer;
