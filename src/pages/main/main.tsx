import type { FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { FilterBlock } from '@/widgets';
import type { commonFilterType, TMainSkillFilter } from '@/shared/global-types';
import { useDispatch, useSelector } from '@/services/store';
import { useEffect } from 'react';
import {
  toggleEducationFilter,
  toggleGenderFilter,
  toggleSkillsFilter,
  getCitiesState,
  getEducationState,
  getGenderState,
  getSkillsState,
  setMockFilters,
  toggleCityFilter,
} from '@/services/slices';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const educationState = useSelector(getEducationState);
  const genderState = useSelector(getGenderState);
  const skillsState = useSelector(getSkillsState);
  const citiesState = useSelector(getCitiesState);

  useEffect(() => {
    dispatch(setMockFilters());
  }, [dispatch]);

  const onEducationChange = (filters: commonFilterType[]) => {
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(toggleEducationFilter(activeFilter));
    }
  };

  const onGenderChange = (filters: commonFilterType[]) => {
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(toggleGenderFilter(activeFilter));
    }
  };

  const getSkillFilterValue = (data: TMainSkillFilter[]) => {
    dispatch(toggleSkillsFilter(data));
  };

  const onCityChange = (data: string) => {
    dispatch(toggleCityFilter(data));
  };

  // Веременно оставлю тут массивы карточек для отображения

  const cardsPopular = CARDS_DATA.filter((__, index) => index < 3 );
  const cardsNew = CARDS_DATA.filter((__, index) => index >= 3 && index < 6);
  const cardsRecomended = CARDS_DATA.filter((__, index) => index >= 6);

  return (
    <main className={styles.main}>
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
        <CardListUI title='Популярное' handleOpen={() => {}} cards={cardsPopular} />
        <CardListUI title='Новое' handleOpen={() => {}} cards={cardsNew} />
        <CardListUI title='Рекомендуем' cards={cardsRecomended} />
      </div>
    </main>
  );
};
