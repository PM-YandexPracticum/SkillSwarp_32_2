import type { FC } from 'react';
import type { CardListProps } from './type';
import styles from './card-list.module.css';
import { ButtonUI } from '../buttonUI';
import { ChevronRightSVG } from '@/assets/svg';
import { UserCard } from '@/widgets';

export const CardListUI: FC<CardListProps> = ({ title, cards, handleOpen }) => {
  return (
    <div className={styles.list}>
      {/* Правильно ли было использовать тут h3? в любом случае его легко можно будет поменять на другой тег */}
      <div className={styles.description}>
        <h3 className={styles.title}>{title}</h3>
        {/* реализация кнопки :) можно конечно вынести в отдельный компонент, но не вижу в этом смысла */}
        {handleOpen && (
          <ButtonUI className={styles.button} type='button' onClick={handleOpen}>
            <span className={styles.button_text}>Смотреть все</span>
            <div className={styles.button_image}>
              {/*<img src='' alt='стрелка вправо' />*/}
              <ChevronRightSVG />
            </div>
          </ButtonUI>
        )}
      </div>
      {/* нужно будет исправить немного кнопку */}
      <ul className={styles.container}>{cards.map(card => <UserCard type='short' card={card} />)}</ul>
    </div>
  );
};
