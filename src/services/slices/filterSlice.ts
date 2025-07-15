import { fetchCategoriesData, fetchCitiesData } from '@/api';
import type { commonFilterType, TCityFilter, TSkillSubFilter } from '@/shared/global-types';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const getCategories = createAsyncThunk('categories/get', fetchCategoriesData);
export const getCities = createAsyncThunk('cities/get', fetchCitiesData);

export type FilterState = {
  education: commonFilterType[];
  gender: commonFilterType[];
  skills: TSkillSubFilter[];
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

export const ALL_SUBFILTERS = MAIN_FILTERS_MOCK.reduce(
  (acc, filter) => [...acc, ...filter.subFilters],
  [] as TSkillSubFilter[]
);

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
    setMockFilters: (state) => {
      state.skills = ALL_SUBFILTERS;
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
    addSkillsFilter: (state, action: PayloadAction<TSkillSubFilter[]>) => {
      state.skills = action.payload;
    },
    addCitiesFilter: (state, action: PayloadAction<TSkillSubFilter>) => {
      state.cities = state.cities.map((city) =>
        city.id === action.payload.id ? { ...city, status: true } : city
      );
      //state.cities = action.payload;
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
      state.skills = state.skills.map((skill) =>
        skill.id === action.payload ? { ...skill, status: false } : skill
      );
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
      //просто достаточно список пустым сделать попробовать
      state.skills = state.skills.map((city) => ({
        ...city,
        status: false,
      }));

      state.cities = state.cities.map((city) => ({
        ...city,
        status: false,
      }));
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getCategories.fulfilled, (state, action) => {
  //       state.skills = action.payload;
  //     })
  //     .addCase(getCities.fulfilled, (state, action) => {
  //       state.cities = action.payload.map((city) => ({
  //         id: city.id,
  //         title: city.title,
  //         type: 'city',
  //         status: false,
  //       }));
  //     });
});

export const {
  setMockFilters,
  addEducationFilter,
  addGenderFilter,
  addSkillsFilter,
  addCitiesFilter,
  // removeEducationFilter,
  // removeGenderFilter,
  // removeSkillsFilter,
  // removeCitiesFilter,
  resetAllFilters,
} = filterSlice.actions;
export const { getEducationState, getGenderState, getSkillsState, getCitiesState } =
  filterSlice.selectors;
export default filterSlice.reducer;
