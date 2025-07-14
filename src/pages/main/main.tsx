import type { FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { FilterBlock, UserCard } from '@/widgets';
import type { commonFilterType, TSkillSubFilter } from '@/shared/global-types';

export const Main: FC = () => {
  function getCommonFilterValue(data: commonFilterType[]) {
    console.log(data);
  }

  function getSkillFilterValue(data: TSkillSubFilter[]) {
    console.log(data);
  }

  return (
    <main className={styles.main}>
      <div>
        <FilterBlock
          onEducationChange={getCommonFilterValue}
          onGenderChange={getCommonFilterValue}
          onSkillChange={getSkillFilterValue}
          onCityChange={getSkillFilterValue}
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
