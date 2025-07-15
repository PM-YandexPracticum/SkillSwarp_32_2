import type { FC } from 'react';
import styles from './main.module.css';
import { ButtonUI, CardListUI } from '@/shared/ui';
import { FilterBlock, UserCard } from '@/widgets';
import type { commonFilterType, TCityFilter, TSkillSubFilter } from '@/shared/global-types';
import { useDispatch, useSelector } from '@/services/store';
import { useEffect } from 'react';
import {
  addCitiesFilter,
  addEducationFilter,
  addGenderFilter,
  addSkillsFilter,
  getEducationState,
  resetAllFilters,
  setMockFilters,
} from '@/services/slices';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const educationState = useSelector(getEducationState);
  const genderState = useSelector((state) => state.filter.gender);
  const skillsState = useSelector((state) => state.filter.skills);
  const citiesState = useSelector((state) => state.filter.cities);

  useEffect(() => {
    dispatch(setMockFilters());
  }, [dispatch]);

  useEffect(() => {
    console.log('Обновлён educationState:', educationState);
  }, [educationState]);

  useEffect(() => {
    console.log('Обновлён genderState:', genderState);
  }, [genderState]);

  useEffect(() => {
    console.log('Обновлён skillsState:', skillsState);
  }, [skillsState]);

  useEffect(() => {
    console.log('Обновлён citiesState:', citiesState);
  }, [citiesState]);

  const onEducationChange = (filters: commonFilterType[]) => {
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(addEducationFilter(activeFilter));
    }
  };

  const onGenderChange = (filters: commonFilterType[]) => {
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(addGenderFilter(activeFilter));
    }
  };

  const getSkillFilterValue = (data: TSkillSubFilter[]) => {
    //dispatch(addSkillsFilter(data));
  }

  // const onCityChange = (data: TSkillSubFilter[]) => {
  //   dispatch(addCitiesFilter(data));
  //   //console.log(data);
  // }
  const kek = () => {
    dispatch(resetAllFilters())
  }

  return (
    <main className={styles.main}>
      <ButtonUI type='button' onClick={kek}>zsfhalsifhaksjf</ButtonUI>
      <div>
        <FilterBlock
          onSkillChange={getSkillFilterValue}
          //onCityChange={onCityChange}
          onCityChange={getSkillFilterValue}
          onEducationChange={onEducationChange}
          onGenderChange={onGenderChange}
        />
      </div>
      <div className={styles.card_blocks}>
        <CardListUI title='Популярное' handleOpen={() => {}}>
          {[...Array(3)].map((_, index) => (
            <UserCard key={index} />
          ))}
        </CardListUI>
        <CardListUI title='Новое' handleOpen={() => {}}>
          {[...Array(3)].map((_, index) => (
            <UserCard key={index} />
          ))}
        </CardListUI>
        <CardListUI title='Рекомендуем'>
          {[...Array(9)].map((_, index) => (
            <UserCard key={index} />
          ))}
        </CardListUI>
      </div>
    </main>
  );
};
