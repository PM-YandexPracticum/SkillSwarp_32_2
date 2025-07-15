import styles from './skill-page.module.css';
import { Footer } from '@/shared/ui/footer';
import { UserCard } from '@/widgets';
import { useCallback, useState, type FC } from 'react';
import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
// import { SameOffers } from '@/widgets/same-offers';
// import { useDispatch, useSelector } from 'react-redux';

export const SkillPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  // const user = useSelector(userSelectors.userDataSelector); // поиск юзера в виджете юзеркард
  // const dispatch = useDispatch();

  // Заглушка. Надо будет осуществить фильтрацию /db/skill-cards.json по card.teachSkill
  // const sameOffers = [
  //   {
  //     id: 'card-0',
  //     userId: 'user-0',
  //     teachSkill: [{ skillTitle: 'Менеджмент команды', type: 'business', subType: '' }],
  //     learnSkill: [
  //       { skillTitle: 'внимательность', type: 'lifestyle', subType: '' },
  //       { skillTitle: 'project-менеджмент', type: 'business', subType: '' },
  //     ],
  //     name: 'Алексей',
  //     city: 'Москва',
  //     age: '29',
  //     description: 'Привет! Люблю джаз по пятницам, крепкий эспрессо и амбициозных людей рядом.',
  //     gender: 'male',
  //     createdAt: 1752065629156,
  //     likes: ['user-2', 'user-1', 'user-15'],
  //     src: '/#',
  //   },
  //   // {
  //   //   id: 'card-1',
  //   //   userId: 'user-1',
  //   //   teachSkill: [{ skillTitle: 'видеомонтаж', type: 'art', subType: '' }],
  //   //   learnSkill: [
  //   //     { skillTitle: 'фотограф', type: 'art', subType: '' },
  //   //     { skillTitle: 'личный брендинг', type: 'business', subType: '' },
  //   //   ],
  //   //   name: 'Марина',
  //   //   city: 'Санкт-Петербург',
  //   //   age: '25',
  //   //   description: 'Привет! Обожаю рассветы на Неве, питерский дождь и креатив во всём.',
  //   //   gender: 'female',
  //   //   createdAt: 1752065679448,
  //   //   likes: ['user-0', 'user-29', 'user-4', 'user-7'],
  //   //   src: '/#',
  //   // },
  //   // {
  //   //   id: 'card-2',
  //   //   userId: 'user-2',
  //   //   teachSkill: [{ skillTitle: 'испанский язык', type: 'languages', subType: '' }],
  //   //   learnSkill: [
  //   //     { skillTitle: 'английский язык', type: 'languages', subType: '' },
  //   //     { skillTitle: 'digital‑маркетинг', type: 'business', subType: '' },
  //   //   ],
  //   //   name: 'Иван',
  //   //   city: 'Новосибирск',
  //   //   age: '32',
  //   //   description: 'Привет! Люблю сноуборд, латте и людей, которые делают мир чуть ярче.',
  //   //   gender: 'male',
  //   //   createdAt: 1752065691824,
  //   //   likes: ['user-9'],
  //   //   src: '/#',
  //   // },
  // ];

  const prevPageHandler = useCallback(() => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  return (
    <>
      <main className={styles.container}>
        <ButtonUI type='button' onClick={prevPageHandler} className={styles.button}>
          <ArrowLeftSVG color='var(--grey-deep-color)' />
          {/* TODO Пока заглушка. Как будет готов, заменить на компонент */}
          <span>Главная / Творчество и искусство / Музыка и звук / Игра на барабанах</span>
        </ButtonUI>
        <div className={styles.skill_content}>
          <UserCard />
          {/* <SkillCard /> TODO Добавить компонент как будет готов*/}
        </div>
        {/* <SameOffers cardsData={sameOffers} /> */}
      </main>
      <Footer />
    </>
  );
};
