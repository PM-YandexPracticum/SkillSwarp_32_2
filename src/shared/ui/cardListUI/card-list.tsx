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
  loading,
}) => {
  return (
    <div className={styles.list}>
      {/* Правильно ли было использовать тут h3? в любом случае его легко можно будет поменять на другой тег */}
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>
        {handleOpen && (
          <ButtonUI className={styles.button} type='button' onClick={handleOpen}>
            <span className={styles.button_text}>Смотреть все</span>
            <div className={styles.button_image}>
              <ChevronRightSVG />
            </div>
          </ButtonUI>
        )}
        {handleSort && (
          <ButtonUI className={styles.button} type='button' onClick={handleSort}>
            <div className={styles.button_image}>
              <SortSVG />
            </div>
            <span className={styles.button_text}>Сначала новые</span>
          </ButtonUI>
        )}
      </div>
      {loading ? (
        <PreloaderUI />
      ) : (
        <ul className={styles.container}>
          {cards.map((card, index) => (
            <UserCard type='short' key={index} card={card} />
          ))}
        </ul>
      )}
    </div>
  );
};
