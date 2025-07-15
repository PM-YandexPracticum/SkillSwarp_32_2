import styles from './skill-page.module.css';
import { Footer } from '@/shared/ui/footer';
import { UserCard } from '@/widgets';
import { useCallback, useState, type FC } from 'react';
import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { SameOffers } from '@/widgets/same-offers';
import { SkillCard } from '@/widgets/skill-card';
// import { useDispatch, useSelector } from 'react-redux';

export const SkillPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const user = useSelector(userSelectors.userDataSelector); // поиск юзера в виджете юзеркард
  // const dispatch = useDispatch();

  // Заглушка. Надо будет осуществить фильтрацию /db/skill-cards.json по card.teachSkill
  const sameOffers = CARDS_DATA;

  const prevPageHandler = useCallback(() => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  return (
    <>
      <main className={styles.container}>
        <ButtonUI type='button' onClick={prevPageHandler} className={styles.button}>
          <ArrowLeftSVG color='var(--grey-deep-color)' />
          {/* TODO Пока заглушка. Как будет готов, заменить на компонент */}
          Главная / Творчество и искусство / Музыка и звук / Игра на барабанах
        </ButtonUI>
        <div className={styles.skill_content}>
          <UserCard />
          <SkillCard 
            card={sameOffers[0]}
            type = 'offer'
            likeHandler={()=>{}}/> 
        </div>
        <div className={styles.same_offers}>
          <h1>Похожие предложения</h1>
          <SameOffers cardsData={sameOffers} />
        </div>
      </main>
      <Footer />
    </>
  );
};
