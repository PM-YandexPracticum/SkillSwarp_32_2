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
import { EnabledFiltersBlock } from '@/widgets/enabled-filters-block';

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

  const cardsPopular = CARDS_DATA.filter((__, index) => index < 3);
  const cardsNew = CARDS_DATA.filter((__, index) => index >= 3 && index < 6);
  const cardsRecomended = CARDS_DATA.filter((__, index) => index >= 6);

  const activeFilters = [
    ...educationState
      .filter((f) => f.status && f.value !== null)
      .map((f) => ({
        id: f.value!,
        title: f.title,
        type: 'education',
      })),

    ...genderState
      .filter((f) => f.status && f.value !== null)
      .map((f) => ({
        id: f.value!,
        title: f.title,
        type: 'gender',
      })),

    ...skillsState.flatMap((skill) =>
      skill.subFilters
        .filter((sf) => sf.status)
        .map((sf) => ({
          id: sf.id,
          title: sf.title,
          type: 'skill',
        }))
    ),

    ...citiesState
      .filter((city) => city.status)
      .map((city) => ({
        id: city.id,
        title: city.title,
        type: 'city',
      })),
  ];

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
        {activeFilters.length > 0 && (
          <>
            <EnabledFiltersBlock filters={activeFilters} />
            <CardListUI
              title={`Подходящие предложения: ${cardsRecomended.length}`}
              handleSort={() => {}} // пока заглушка
              cards={cardsRecomended}
            />
          </>
        )}
        <CardListUI title='Популярное' handleOpen={() => {}} cards={cardsPopular} />
        <CardListUI title='Новое' handleOpen={() => {}} cards={cardsNew} />
        <CardListUI title='Рекомендуем' cards={cardsRecomended} />
      </div>
    </main>
  );
};
