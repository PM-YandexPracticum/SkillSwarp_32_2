import { fetchCategoriesData, fetchCitiesData } from '@/api';
import type { commonFilterType, TMainSkillFilter, TSkillSubFilter } from '@/shared/global-types';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('categories/get', fetchCategoriesData);
export const getCities = createAsyncThunk('cities/get', fetchCitiesData);

export type FilterState = {
  education: commonFilterType[];
  gender: commonFilterType[];
  skills: TMainSkillFilter[];
  cities: TSkillSubFilter[];
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
    getFilterState: (state) => state,
  },
  reducers: {
    setMockFilters: (state) => {
      state.skills = MAIN_FILTERS_MOCK;
      state.cities = CITIES_MOCK.map((city) => ({
        id: city.id,
        title: city.title,
        type: 'city',
        status: false,
      }));
    },
    addEducationFilter: (state, action: PayloadAction<commonFilterType>) => {
      state.education = state.education.map((item) => ({
        ...item,
        status: item.value === action.payload.value,
      }));
    },
    addGenderFilter: (state, action: PayloadAction<commonFilterType>) => {
      state.gender = state.gender.map((item) => ({
        ...item,
        status: item.value === action.payload.value,
      }));
    },
    addSkillsFilter: (state, action: PayloadAction<TSkillSubFilter>) => {
      state.skills = state.skills.map((category) => ({
        ...category,
        subFilters: category.subFilters.map((subFilter) =>
          subFilter.id === action.payload.id
            ? { ...subFilter, status: true }
            : subFilter
        ),
      }));
    },
    addCitiesFilter: (state, action: PayloadAction<TSkillSubFilter>) => {
      state.cities = state.cities.map((city) =>
        city.id === action.payload.id ? { ...city, status: true } : city
      );
    },
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
    resetAllFilters: (state) => {
      state.education = state.education.map((item) => ({
        ...item,
        status: item.value === null,
      }));
      state.gender = state.gender.map((item) => ({
        ...item,
        status: item.value === null,
      }));
      state.skills = state.skills.map((category) => ({
        ...category,
        subFilters: category.subFilters.map((subFilter) => ({
          ...subFilter,
          status: false,
        })),
      }));
      state.cities = state.cities.map((city) => ({
        ...city,
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
  }
});

export const {
  setMockFilters,
  addEducationFilter,
  addGenderFilter,
  addSkillsFilter,
  addCitiesFilter,
  removeEducationFilter,
  removeGenderFilter,
  removeSkillsFilter,
  removeCitiesFilter,
  resetAllFilters,
} = filterSlice.actions;
export const { getFilterState } = filterSlice.selectors;
export default filterSlice.reducer;
