import styles from './skill-page.module.css';
import { UserCard } from '@/widgets';
import { useEffect, type FC } from 'react';
import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI, PreloaderUI } from '@/shared/ui';
import { SameOffers } from '@/widgets/same-offers';
import { SkillCard } from '@/widgets/skill-card';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '@/services/store';
import { getCardsState, getCardsLoadingState } from '@/services/slices';
import { filterSameOffers } from '@/shared/lib/helpers/helpers';

export const SkillPage: FC = () => {
  const { userId } = useParams();
  // const [currentPage, setCurrentPage] = useState(0);
  // const user = useSelector(userSelectors.userDataSelector); // поиск юзера в виджете юзеркард
  // const dispatch = useDispatch();

  const cardsState = useSelector(getCardsState);
  const loading = useSelector(getCardsLoadingState);
  const card = cardsState.find((card) => card.userId === userId)!;
  const sameOffers = filterSameOffers(card, cardsState);

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
          <span> Главная / </span> <span>{card.teachSkill[0].type} / </span>{' '}
          <span>{card.teachSkill[0].subType} / </span> <span>{card.teachSkill[0].title}</span>
        </ButtonUI>
        <div className={styles.skill_content}>
          <UserCard card={card} type='full' />
          <SkillCard card={card} type='offer' likeHandler={() => {}} />
        </div>
        <div className={styles.same_offers}>
          <h1>Похожие предложения</h1>
          {loading ? (
            <PreloaderUI />
          ) : sameOffers.length ? (
            <SameOffers cardsData={sameOffers} />
          ) : (
            <h2 className={styles.no_results_title}>Ничего не найдено</h2>
          )}
        </div>
      </main>
    </>
  );
};
