import type { FC } from 'react';
import type { CardListProps } from './type';
import styles from './card-list.module.css';
import { ButtonUI } from '../buttonUI';
import { ChevronRightSVG } from '@/assets/svg';
import { UserCard } from '@/widgets';
import { SortSVG } from '@/assets/svg/sort';
import { PreloaderUI } from '../preloaderUI';

export const CardListUI: FC<CardListProps> = ({
  title,
  cards,
  handleOpen,
  handleSort,
  sortType,
  loading,
  user,
}) => {
  return (
    <div className={styles.list}>
      {/* Правильно ли было использовать тут h3? в любом случае его легко можно будет поменять на другой тег */}
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>
        {handleOpen && (
          <ButtonUI className={styles.button} type='link' to={handleOpen}>
            <span className={styles.button_text}>Смотреть все</span>
            <div className={styles.button_image}>
              <ChevronRightSVG color='currentColor' />
            </div>
          </ButtonUI>
        )}
        {handleSort && (
          <ButtonUI className={styles.button} type='button' onClick={handleSort}>
            <div className={styles.button_image}>
              <SortSVG color='currentColor' />
            </div>
            <span className={styles.button_text}>
              {sortType === 'newest' ? 'Сначала старые' : 'Сначала новые'}
            </span>
          </ButtonUI>
        )}
      </div>
      {loading ? (
        <PreloaderUI />
      ) : (
        <ul className={styles.container}>
          {cards.map((card, index) => (
            <UserCard type='short' key={index} card={card}  user={user}/>
          ))}
        </ul>
      )}
    </div>
  );
};
