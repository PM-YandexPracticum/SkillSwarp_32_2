// src/pages/skill-page/skill-page.tsx
import styles from './skill-page.module.css';
import { UserCard } from '@/widgets';
import { useEffect, type FC } from 'react';
import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { SameOffers } from '@/widgets/same-offers';
import { SkillCard } from '@/widgets/skill-card';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '@/services/store';

// Импортируем селектор для проверки авторизации
// TODO: Заменить на правильный селектор когда будет готов userSlice
const getIsAuthenticated = (state: any) => state.user?.isAuth || false;

export const SkillPage: FC = () => {
  const { userId } = useParams();
  const isAuthenticated = useSelector(getIsAuthenticated);

  // Заглушки. Надо будет осуществить фильтрацию /db/skill-cards.json по card.teachSkill
  const sameOffers = CARDS_DATA;
  const card = CARDS_DATA.find((card) => card.userId === userId) || CARDS_DATA[0];

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <main className={styles.container}>
        <ButtonUI type='link' to='/' className={styles.button}>
          <ArrowLeftSVG color='var(--grey-deep-color)' />
          {/* TODO Пока заглушка. Как будет готов, заменить на компонент */}
          <span> Главная / </span> <span>{card.teachSkill[0].type} / </span>{' '}
          <span>{card.teachSkill[0].subType} / </span> <span>{card.teachSkill[0].title}</span>
        </ButtonUI>
        <div className={styles.skill_content}>
          {/* UserCard теперь не требует проверки авторизации */}
          <UserCard card={card} type='full' />
          {/* Только SkillCard проверяет авторизацию для функционала обмена */}
          <SkillCard 
            card={card} 
            type='offer' 
            likeHandler={() => {}} 
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className={styles.same_offers}>
          <h1>Похожие предложения</h1>
          <SameOffers cardsData={sameOffers} />
        </div>
      </main>
    </>
  );
};
