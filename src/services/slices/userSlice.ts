import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TCard, TUser } from '@/shared/global-types';
import { checkRegistration, checkUserAuth, loginUser, registerUser } from '@/api/skill-swap-api';

interface UserState {
  user: TUser | null;
  isAuth: boolean;
  registrationData: Partial<TUser & TCard>;
  errorMessage: string | null;
  registrationError: boolean;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  registrationData: {},
  errorMessage: null,
  registrationError: false,
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

export const checkAuthThunk = createAsyncThunk<TUser | null, void, { rejectValue: string }>(
  'checkAuthThunk',
  async (_, { rejectWithValue }) => {
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
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
  },
  selectors: {
    selectUserData: (state) => state.user,
    selectRegistrationData: (state) => state.registrationData,
    selectError: (state) => state.errorMessage,
    selectRegistrationError: (state) => state.registrationError,
    selectLikes: (state) => state.user?.likes
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
      });
  },
});

export const {
  logout,
  setRegistrationStepData,
  clearRegistrationData,
} = userSlice.actions;

export const { selectRegistrationData, selectError, selectUserData, selectRegistrationError, selectLikes } =
  userSlice.selectors;

export default userSlice.reducer;
