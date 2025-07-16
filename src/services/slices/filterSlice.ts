import { fetchCategoriesData, fetchCitiesData } from '@/api';
import type { commonFilterType, TCityFilter, TMainSkillFilter } from '@/shared/global-types';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('categories/get', fetchCategoriesData);
export const getCities = createAsyncThunk('cities/get', fetchCitiesData);

export type FilterState = {
  education: commonFilterType[];
  gender: commonFilterType[];
  skills: TMainSkillFilter[];
  cities: TCityFilter[];
};

export const initialState: FilterState = {
  education: [
    {
      title: 'Всё',
      value: null,
      status: true,
    },
    {
      title: 'Хочу научиться',
      value: 'learn',
      status: false,
    },
    {
      title: 'Могу научить',
      value: 'teach',
      status: false,
    },
  ],
  gender: [
    {
      title: 'Не имеет значения',
      value: null,
      status: true,
    },
    {
      title: 'Мужской',
      value: 'male',
      status: false,
    },
    {
      title: 'Женский',
      value: 'female',
      status: false,
    },
  ],
  skills: [],
  cities: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    getEducationState: (state) => state.education,
    getGenderState: (state) => state.gender,
    getSkillsState: (state) => state.skills,
    getCitiesState: (state) => state.cities,
  },
  reducers: {
    // Нужен, пока нет api
    setMockFilters: (state) => {
      state.skills = MAIN_FILTERS_MOCK;
      state.cities = CITIES_MOCK.map((city) => ({
        title: city.title,
        id: city.id,
        type: 'city',
        status: false,
      }));
    },
    toggleEducationFilter: (state, action: PayloadAction<commonFilterType>) => {
      state.education = state.education.map((item) => ({
        ...item,
        status: item.value === action.payload.value,
      }));
    },
    toggleGenderFilter: (state, action: PayloadAction<commonFilterType>) => {
      state.gender = state.gender.map((item) => ({
        ...item,
        status: item.value === action.payload.value,
      }));
    },
    toggleSkillsFilter: (state, action: PayloadAction<TMainSkillFilter[]>) => {
      state.skills = action.payload;
    },
    toggleCityFilter: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.map((city) =>
        city.id === action.payload ? { ...city, status: !city.status } : city
      );
    },

    // Все remove-методы нужны для удаления фильтров, когда они появляются вверху стрницы
    removeEducationFilter: (state) => {
      state.education = state.education.map((item) => ({
        ...item,
        status: item.value === null,
      }));
    },
    removeGenderFilter: (state) => {
      state.gender = state.gender.map((item) => ({
        ...item,
        status: item.value === null,
      }));
    },
    removeSkillsFilter: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.map((category) => ({
        ...category,
        subFilters: category.subFilters.map((subFilter) =>
          subFilter.id === action.payload ? { ...subFilter, status: false } : subFilter
        ),
      }));
    },
    removeCitiesFilter: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.map((city) =>
        city.id === action.payload ? { ...city, status: false } : city
      );
    },

    // Для кнопки сброса всех фильтров
    resetAllFilters: (state) => {
      state.education = state.education.map((item) => ({
        ...item,
        status: item.value === null,
      }));
      state.gender = state.gender.map((item) => ({
        ...item,
        status: item.value === null,
      }));
      state.skills = state.skills.map((mainFilter) => ({
        ...mainFilter,
        subFilters: mainFilter.subFilters.map((sub) => ({
          ...sub,
          status: false,
        })),
      }));
      state.cities = state.cities.map((item) => ({
        ...item,
        status: false,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.cities = action.payload.map((city) => ({
          id: city.id,
          title: city.title,
          type: 'city',
          status: false,
        }));
      });
  },
});

export const {
  setMockFilters,
  toggleEducationFilter,
  toggleGenderFilter,
  toggleSkillsFilter,
  toggleCityFilter,
  removeEducationFilter,
  removeGenderFilter,
  removeSkillsFilter,
  removeCitiesFilter,
  resetAllFilters,
} = filterSlice.actions;
export const { getEducationState, getGenderState, getSkillsState, getCitiesState } =
  filterSlice.selectors;
export default filterSlice.reducer;
