import styles from './skill-page.module.css';
import { UserCard } from '@/widgets';
import { useEffect, type FC } from 'react';
import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { SameOffers } from '@/widgets/same-offers';
import { SkillCard } from '@/widgets/skill-card';
import { useLocation, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

export const SkillPage: FC = () => {
  const { userId } = useParams();
  // const [currentPage, setCurrentPage] = useState(0);
  // const user = useSelector(userSelectors.userDataSelector); // поиск юзера в виджете юзеркард
  // const dispatch = useDispatch();

  // Заглушки. Надо будет осуществить фильтрацию /db/skill-cards.json по card.teachSkill
  const sameOffers = CARDS_DATA;
  const card = CARDS_DATA.find((card) => card.userId === userId) || CARDS_DATA[0];

  // const prevPageHandler = useCallback(() => {
  //   if (currentPage > 0) setCurrentPage(currentPage - 1);
  // }, [currentPage]);

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
        <span> Главная / </span> <span>{card.teachSkill[0].type} / </span> <span>{card.teachSkill[0].subType} / </span> <span>{card.teachSkill[0].title}</span>
         
        </ButtonUI>
        <div className={styles.skill_content}>
          <UserCard card={card} type='full' />
          <SkillCard card={card} type='offer' likeHandler={() => {}} />
        </div>
        <div className={styles.same_offers}>
          <h1>Похожие предложения</h1>
          <SameOffers cardsData={sameOffers} />
        </div>
      </main>
    </>
  );
};
