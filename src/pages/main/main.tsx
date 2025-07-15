import type { FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { FilterBlock, UserCard } from '@/widgets';
import type { commonFilterType, TSkillSubFilter } from '@/shared/global-types';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';

export const Main: FC = () => {
  function getCommonFilterValue(data: commonFilterType[]) {
    console.log(data);
  }

  function getSkillFilterValue(data: TSkillSubFilter[]) {
    console.log(data);
  }

  // Веременно оставлю тут массивы карточек для отображения

  const cardsPopular = CARDS_DATA.filter((__, index) => index < 3 )
  const cardsNew = CARDS_DATA.filter((__, index) => index >= 3 && index < 6)
  const cardsRecomended = CARDS_DATA.filter((__, index) => index >= 6)

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
        <CardListUI title='Популярное' handleOpen={() => {}} cards={cardsPopular} />
        <CardListUI title='Новое' handleOpen={() => {}} cards={cardsNew} />
        <CardListUI title='Рекомендуем' cards={cardsRecomended} />
      </div>
    </main>
  );
};
