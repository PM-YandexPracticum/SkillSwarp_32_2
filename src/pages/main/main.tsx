import { useState, type FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { FilterBlock } from '@/widgets';
import type { commonFilterType, SortType, TMainSkillFilter } from '@/shared/global-types';
import { useDispatch, useSelector } from '@/services/store';
import {
  toggleEducationFilter,
  toggleGenderFilter,
  toggleSkillsFilter,
  getCitiesState,
  getEducationState,
  getGenderState,
  getSkillsState,
  toggleCityFilter,
  getCardsState,
  getCardsLoadingState,
  selectUserData,
} from '@/services/slices';
import { EnabledFiltersBlock } from '@/widgets/enabled-filters-block';
import {
  checkAllActiveFilters,
  filterCards,
  sorByRecommendedChaos,
  sortByNewest,
  sortByPopular,
} from '@/shared/lib/helpers/helpers';

export const Main: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const educationState = useSelector(getEducationState);
  const genderState = useSelector(getGenderState);
  const skillsState = useSelector(getSkillsState);
  const citiesState = useSelector(getCitiesState);
  const cardsState = useSelector(getCardsState);
  const loading = useSelector(getCardsLoadingState);

  const [sortType, setSortType] = useState<SortType>('default');

  const cards = filterCards(cardsState, {
    education: educationState,
    gender: genderState,
    skills: skillsState,
    cities: citiesState,
  });

  const sortedCards = sortType === 'newest' ? sortByNewest(cards) : cards;

  const checkFiltersState = checkAllActiveFilters(
    skillsState,
    genderState,
    educationState,
    citiesState
  );

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

  const sortCards = () => {
    setSortType(sortType === 'newest' ? 'default' : 'newest');
  };

  const cardsPopular = sortByPopular(cardsState, 3);
  const cardsNew = sortByNewest(cardsState, 3);
  const cardsRecommendedChaos = sorByRecommendedChaos(cardsState);

  const activeFilters = [
    ...educationState
      .filter((f) => f.status && f.value !== 'empty')
      .map((f) => ({
        id: f.value!,
        title: f.title,
        type: 'education',
      })),

    ...genderState
      .filter((f) => f.status && f.value !== 'empty')
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
      <div className={styles.filter_block}>
        <FilterBlock
          educationFilters={educationState}
          cityFilters={citiesState}
          skillFilters={skillsState}
          genderFilters={genderState}
          onSkillChange={getSkillFilterValue}
          onCityChange={onCityChange}
          onEducationChange={onEducationChange}
          onGenderChange={onGenderChange}
          activeFiltersCount={activeFilters.length}
        />
      </div>

      <div className={styles.card_blocks}>
        {checkFiltersState ? (
          <>
            {activeFilters.length > 0 && <EnabledFiltersBlock filters={activeFilters} />}
            {cards.length > 0 ? (
              <CardListUI
                title={`Подходящие предложения: ${cards.length}`}
                handleSort={sortCards}
                sortType={sortType}
                cards={sortedCards}
                user={user}
              />
            ) : (
              <h2 className={styles.noResultsTitle}>Ничего не найдено по вашему запросу</h2>
            )}
          </>
        ) : (
          <>
            <CardListUI
              title='Популярное'
              handleOpen='/popular'
              cards={cardsPopular}
              loading={loading}
              user={user}
            />
            <CardListUI
              title='Новое'
              handleOpen='/newest'
              cards={cardsNew}
              loading={loading}
              user={user}
            />
            <CardListUI
              title='Рекомендуем'
              handleOpen='/recommended'
              cards={cardsRecommendedChaos}
              loading={loading}
              user={user}
            />
          </>
        )}
      </div>
    </main>
  );
};
