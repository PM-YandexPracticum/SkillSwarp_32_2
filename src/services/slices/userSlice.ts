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
  editUserData,
} from '@/api/skill-swap-api';

interface UserState {
  user: TUser;
  isAuth: boolean;
  registrationData: Partial<TUser & TCard>;
  errorMessage: string | null;
  registrationError: boolean;
  loading: boolean;
}

const initialUser: TUser = {
  id: '',
  userId: '',
  gender: 'male',
  name: '',
  city: 'Город',
  age: 0,
  mail: '',
  password: '',
  description: '',
  fullDescription: '',
  incoming: [],
  outgoing: [],
  image: '/#',
  likes: [],
};

const initialState: UserState = {
  user: initialUser,
  isAuth: false,
  registrationData: {},
  errorMessage: null,
  registrationError: false,
  loading: false,
};

// Thunks

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
        return rejectWithValue('Пользователь не авторизован');
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
      const userData = await checkRegistration(mail);
      return userData.length > 0;
    } catch (error) {
      return rejectWithValue(`Ошибка при проверке пользователя: ${error}`);
    }
  }
);

export const editUserDataThunk = createAsyncThunk<
  TUser,
  { userData: Omit<TUser, 'id'>; userId: string },
  { rejectValue: string }
>('user/editUserData', async ({ userData, userId }, { rejectWithValue }) => {
  try {
    const updatedUser = await editUserData(userData, userId);
    return updatedUser;
  } catch (error) {
    return rejectWithValue(`Ошибка при обновлении данных пользователя: ${error}`);
  }
});

export const likeCardThunk = createAsyncThunk<
  void,
  { cardId: string; userId: string },
  { rejectValue: string }
>('likeCardThunk', async ({ cardId, userId }, { rejectWithValue }) => {
  try {
    await postLikeCard(cardId, userId);
  } catch (error) {
    return rejectWithValue(`Ошибка при лайке карточки: ${error}`);
  }
});

export const disLikeCardThunk = createAsyncThunk<
  void,
  { cardId: string; userId: string },
  { rejectValue: string }
>('disLikeCardThunk', async ({ cardId, userId }, { rejectWithValue }) => {
  try {
    await postDislikeCard(cardId, userId);
  } catch (error) {
    return rejectWithValue(`Ошибка при дизлайке карточки: ${error}`);
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
    return rejectWithValue(`Ошибка при сохранении лайков: ${error}`);
  }
});

// Slice

const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getIsAuthenticated: (state) => state.isAuth,
    selectUserData: (state) => state.user,
    getLikedCards: (state) => state.user.likes,
    getOffersSent: (state) => state.user.outgoing,
    getOffersReceived: (state) => state.user.incoming,
    selectRegistrationData: (state) => state.registrationData,
    selectError: (state) => state.errorMessage,
    selectRegistrationError: (state) => state.registrationError,
    selectLikes: (state) => state.user?.likes,
    selectLoading: (state) => state.loading,
  },
  reducers: {
    logout(state) {
      state.user = initialUser;
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
    toggleLike(state, action: PayloadAction<string>) {
      if (state.user.likes.includes(action.payload)) {
        state.user.likes = state.user.likes.filter((id) => id !== action.payload);
      } else {
        state.user.likes = [...state.user.likes, action.payload];
      }
    },
    updateUserField<K extends keyof TUser>(
      state: UserState,
      action: PayloadAction<{ field: K; value: TUser[K] }>
    ) {
      const { field, value } = action.payload;
      state.user[field] = value;
    },
    clearError(state) {
      state.errorMessage = null;
    },
    // Если всё ещё нужно будет тестировать - замена тест юзеру, который хардкодился при загрузке страницы
    setTestUser(state) {
      state.user = {
        id: '999999999',
        userId: 'user-dev',
        gender: 'male',
        name: 'User',
        city: 'Москва',
        age: 30,
        mail: 'dev@example.com',
        password: '123456',
        description: 'Test user',
        fullDescription: 'Full description',
        incoming: [],
        outgoing: [],
        image: '/#',
        likes: [],
      };
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Что-то пошло не так';
        state.loading = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })

      .addCase(registerUserThunk.pending, (state) => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.registrationData = {};
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Ошибка регистрации';
        state.loading = false;
      })

      .addCase(checkAuthThunk.pending, (state) => {
        state.errorMessage = null;
        state.loading = true;
      })
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.loading = false;
      })
      .addCase(checkAuthThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Ошибка авторизации';
        state.loading = false;
      })

      .addCase(checkUserExist.fulfilled, (state, action) => {
        state.registrationError = action.payload;
      })
      .addCase(checkUserExist.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserExist.rejected, (state) => {
        state.loading = false;
      })

      .addCase(editUserDataThunk.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(editUserDataThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(editUserDataThunk.rejected, (state, action) => {
        state.errorMessage = action.payload || 'Ошибка при обновлении профиля';
        state.loading = false;
      })

      .addCase(saveLikedCardThunk.fulfilled, (state, action) => {
        state.user.likes = action.payload;
      });
  },
});

export const {
  logout,
  setRegistrationStepData,
  clearRegistrationData,
  toggleLike,
  updateUserField,
  clearError,
  setTestUser,
} = userSlice.actions;

// Selectors
export const {
  getIsAuthenticated,
  selectUserData,
  getLikedCards,
  getOffersSent,
  getOffersReceived,
  selectRegistrationData,
  selectError,
  selectRegistrationError,
  selectLikes,
  selectLoading,
} = userSlice.selectors;

export default userSlice.reducer;
