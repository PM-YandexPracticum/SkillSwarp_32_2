import React, { useEffect } from 'react';
import styles from './newest.module.css';
import { sortByNewest } from '../../shared/lib/helpers/helpers';
import { UserCardUI } from '@/shared/ui/userCardUI';
import { ButtonUI } from '@/shared/ui';
import type { NewestProps } from './type';
import { ChevronRightSVG } from '@/assets/svg';
import { useSelector } from '@/services/store';
import { selectUserData } from '@/services/slices';


export const Newest: React.FC<NewestProps> = ({ cards }) => {
  const newestCards = sortByNewest(cards, 20);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector(selectUserData);

  return (
    <div className={styles['main']}>
      <div className={styles['menu']}>
        <h2 className={styles['menu__title']}>{user.id ? 'Новые идеи' : 'Новое'}</h2>
        <ButtonUI className={styles['menu__btn']} type='link' to='/'>
          <span className={styles.chevron}>
            <ChevronRightSVG color='currentColor' />
          </span>
          <span>Вернуться назад</span>
        </ButtonUI>
      </div>

      <div className={styles['card-list']}>
        {newestCards.map((card) => (
          // Поправить логику! Прокинуть лайки. Мб изменить компонент, у нас есть КАРДЛИСТ
          <UserCardUI key={card.id} card={card} type='short' setLike={() => {}} isLiked={false}/>
        ))}
      </div>
    </div>
  );
};
