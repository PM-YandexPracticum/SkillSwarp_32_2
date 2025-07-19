import React, { useEffect } from 'react';
import styles from './popular.module.css';
import { sortByPopular } from '../../shared/lib/helpers/helpers';
import { UserCardUI } from '@/shared/ui/userCardUI';
import { ButtonUI } from '@/shared/ui';
import type { PopularProps } from './type';

export const Popular: React.FC<PopularProps> = ({ cards }) => {
  const popularCards = sortByPopular(cards, 20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['main']}>
      <div className={styles['menu']}>
        <h2 className={styles['menu__title']}>Популярное</h2>
        <ButtonUI className={styles['menu__btn']} type='link' to='/'>
          Вернуться назад
        </ButtonUI>
      </div>

      <div className={styles['card-list']}>
        {popularCards.map((card) => (
          <UserCardUI key={card.id} card={card} type='short' setLike={() => {}} />
        ))}
      </div>
    </div>
  );
};
