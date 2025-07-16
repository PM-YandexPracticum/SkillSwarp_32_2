import type { FC } from 'react';
import styles from './main.module.css';
import { ButtonUI, CardListUI } from '@/shared/ui';
import { FilterBlock, UserCard } from '@/widgets';
import type { commonFilterType, TMainSkillFilter} from '@/shared/global-types';
import { useDispatch, useSelector } from '@/services/store';
import { useEffect } from 'react';
import {
  addEducationFilter,
  addGenderFilter,
  addSkillsFilter,
  getEducationState,
  resetAllFilters,
  setMockFilters,
  toggleCityFilter,
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
  }, [educationState]);

  useEffect(() => {
  }, [genderState]);

  useEffect(() => {
  }, [skillsState]);

  useEffect(() => {
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

  const getSkillFilterValue = (data: TMainSkillFilter[]) => {
    console.log(data);
    dispatch(addSkillsFilter(data));
  };

  const onCityChange = (data: string) => {
    dispatch(toggleCityFilter(data));

  };
  const kek = () => {
    dispatch(resetAllFilters());
  };

  return (
    <main className={styles.main}>
      <ButtonUI type='button' onClick={kek}>
        zsfhalsifhaksjf
      </ButtonUI>
      <div>
        <FilterBlock
          educationFilters={educationState}
          cityFilters={citiesState}
          skillFilters={skillsState}
          genderFilters={genderState}
          onSkillChange={getSkillFilterValue}
          onCityChange={onCityChange}
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
