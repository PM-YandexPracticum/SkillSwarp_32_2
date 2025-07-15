import type { FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { FilterBlock, UserCard } from '@/widgets';
import type { commonFilterType, TSkillSubFilter } from '@/shared/global-types';
import { useDispatch } from '@/services/store';
import { useEffect } from 'react';
import {
  addEducationFilter,
  addGenderFilter,
  addSkillsFilter,
  // addEducationFilter,
  // addGenderFilter,
  // addSkillsFilter,
  setMockFilters,
} from '@/services/slices';

export const Main: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMockFilters());
  }, [dispatch]);

  /*function getCommonFilterValue(data: commonFilterType[]) {
    console.log(data);
  }*/

  function getSkillFilterValue(data: TSkillSubFilter[]) {
    console.log('Диспатч addSkillsFilter:', data);
    dispatch(addSkillsFilter(data));
    // console.log(data);
  }
  const onEducationChange = (filters: commonFilterType[]) => {
    //Можно же все состояние забирать? Можно не фильтроват ьили я ошибаюсь?
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(addEducationFilter(activeFilter));
      console.log('Диспатч addEducationFilter:', activeFilter);
      // console.log(filters);
    }
  };

  const onGenderChange = (filters: commonFilterType[]) => {
    const activeFilter = filters.find((f) => f.status);
    if (activeFilter) {
      dispatch(addGenderFilter(activeFilter));
      console.log('Диспатч addGenderFilter:', activeFilter);
      // console.log(filters);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <FilterBlock
          /*onEducationChange={getCommonFilterValue}
          onGenderChange={getCommonFilterValue}*/
          onSkillChange={getSkillFilterValue}
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
