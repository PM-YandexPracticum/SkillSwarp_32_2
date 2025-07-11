import type { TSameOffersProps } from './type';
import styles from './same-offers.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonUI, UserCardUI } from '@/shared/ui';
import { ChevronRightSVG } from '@/assets/svg';

const mediaQueries = {
  fourCards: { query: '(min-width: 1420px)', count: 4 },
  threeCards: { query: '(min-width: 1090px) and (max-width: 1419px)', count: 3 }, 
  twoCards: { query: '(min-width: 740px) and (max-width: 1089px)', count: 2 },
  oneCard: { query: '(max-width: 740px)', count: 1 }
};

export const SameOffers  = ({cardsData}: TSameOffersProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(1);

  const widthChangeHandler = (e: MediaQueryListEvent | MediaQueryList) => {
    if (!e.matches) return;

    Object.values(mediaQueries).forEach(mediaQuery => {
      if (e.media === mediaQuery.query) setCardsVisible(mediaQuery.count);
    });
  };

  // Динамически меняем количество отображаемых карточек в зависимости от ширины экрана
  useEffect(() => {
    const fourCardsQuery = window.matchMedia(mediaQueries.fourCards.query);
    const threeCardsQuery = window.matchMedia(mediaQueries.threeCards.query);
    const twoCardsQuery = window.matchMedia(mediaQueries.twoCards.query);
    const oneCardQuery = window.matchMedia(mediaQueries.oneCard.query);
    const queries = [oneCardQuery, twoCardsQuery, threeCardsQuery, fourCardsQuery];

    queries.forEach(query => {
      widthChangeHandler(query);
      query.addEventListener('change', widthChangeHandler);
    });

    return () => {
      queries.forEach(query => query.removeEventListener('change', widthChangeHandler));
    };
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [cardsVisible]);

  const totalPages = useMemo(
    () => Math.ceil(cardsData.length / cardsVisible),
    [cardsData.length, cardsVisible]
  );

  const currentCards = cardsData.slice(
    currentPage * cardsVisible,
    (currentPage + 1) * cardsVisible
  );

  const prevPageHandler = useCallback(() => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  }, [currentPage]);

  const nextPageHandler = useCallback(() => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  }, [currentPage, totalPages]);

  return (
    <div className={
      cardsVisible === 1 
      ? `${styles.container} ${styles['container-one-card']}` 
      : styles.container
    }>
      {currentCards.map((card, index) => (
        <ButtonUI type='link' key={index} to={`/skill/${card.userId}`}>
          {/* <UserCard /> */}
          <UserCardUI
            skills={card.teachSkill}
            desired={card.learnSkill}
            user={card}
            type='short'
            buttonClick={() => {}}
            setLike={() => {}}
          />
        </ButtonUI>
      ))}

      { currentPage > 0 && (
        <ButtonUI 
          type='button'
          aria-label='Предыдущая страница'
          className={`${styles.button} ${styles['button-prev']}`} 
          onClick={prevPageHandler}>
            <ChevronRightSVG />
        </ButtonUI>
      )}
      
      { currentPage < totalPages - 1 && (
        <ButtonUI 
          type='button'
          aria-label='Следующая страница'
          className={`${styles.button} ${styles['button-next']}`} 
          onClick={nextPageHandler}>
            <ChevronRightSVG />
        </ButtonUI>
      )}
      
    </div>
  );
};
