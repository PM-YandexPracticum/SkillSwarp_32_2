import type { FC } from 'react';
import styles from './main.module.css';
import { CardListUI } from '@/shared/ui';
import { UserCard } from '@/widgets';

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.filters}></div>
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
