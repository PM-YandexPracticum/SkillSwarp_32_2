// src/services/slices/userSlice.ts
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
import { USERS_DATA } from '@/shared/global-types/data-users-example';

interface UserState {
  user: TUser;
  isAuth: boolean;
  registrationData: Partial<TUser & TCard>;
  errorMessage: string | null;
  registrationError: boolean;
  loading: boolean;
}

// Тестовый пользователь для разработки
const testUser: TUser = {
  ...USERS_DATA[0],
  likes: ['user-2', 'user-5', 'user-8'],
  incoming: [
    {
      userId: 'user-3',
      status: 'pending',
      createdAt: Date.now() - 86400000,
      isRead: false
    },
    {
      userId: 'user-7',
      status: 'fulfilled',
      createdAt: Date.now() - 172800000,
      isRead: false
    }
  ],
  outgoing: [
    {
      userId: 'user-12',
      status: 'pending',
      createdAt: Date.now() - 43200000,
      isRead: false
    },
    {
      userId: 'user-15',
      status: 'rejected',
      createdAt: Date.now() - 259200000,
      isRead: false
    }
  ]
};

const initialState: UserState = {
  // Для разработки используем тестового пользователя
  // В продакшене должен быть пустой пользователь
  user: process.env.NODE_ENV === 'development' ? testUser : {
    id: '',
    gender: 'male',
    userId: '',
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
  },
  isAuth: process.env.NODE_ENV === 'development' ? true : false, // Авторизован для разработки
  registrationData: {},
  errorMessage: null,
  registrationError: false,
  loading: false,
};

// Existing thunks...

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

export const checkUserExist = createAsyncThunk<
  boolean,
  { mail: string },
  { rejectValue: string }
>('auth/checkUserExist', async ({ mail }, { rejectWithValue }) => {
  try {
    const userData = await checkRegistration(mail);
    if (userData.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    return rejectWithValue(`Ошибка при проверке пользователя: ${error}`);
  }
});

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
    // Добавляем экшен для установки тестового пользователя
    setTestUser(state) {
      state.user = testUser;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
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
      // Register
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
      // Check Auth
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
      // Check User Exist
      .addCase(checkUserExist.fulfilled, (state, action) => {
        state.registrationError = action.payload;
      })
      .addCase(checkUserExist.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserExist.rejected, (state) => {
        state.loading = false;
      })
      // Edit User Data
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
      // Save Liked Card
      .addCase(saveLikedCardThunk.fulfilled, (state, action) => {
        state.user.likes = action.payload;
      });
  },
});

// Actions
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
