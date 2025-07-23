// src/pages/profile-outgoing-page/profile-outgoing-page.tsx
import profile from '@/images/profile-avatar.png';
import styles from '@/pages/profile-page/profile-page.module.css';
import { ProfileMenu } from '@/shared/ui/profileMenuUI';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { UserCard } from '@/widgets';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/services/slices';
import { Footer } from '@/shared/ui/footer';

export const ProfileOutgoing = () => {
  const user = useSelector(selectUserData);

  const userName = user?.name || 'Имя';
  const userAge = user?.age || 'Возраст';
  const userCity = user?.city || 'Город';

  // Найдем карточки и добавим проверку на undefined
  const card1 = CARDS_DATA[5];
  const card2 = CARDS_DATA[12];

  return (
    <>
      {' '}
      <main className={styles.main}>
        <div className={styles.profile}>
          <div
            className={`${styles['profile__column']} ${styles['profile__column-menu']} ${styles['profile__column-menu--applications']}`}
          >
            <div className={styles['profile__applications-menu']}>
              <div className={styles['profile__applications-avatar']}>
                <ProfileAvatar userAvatar={user?.image || profile} />

                <div className={styles['profile__applications-text']}>
                  <h2 className={styles['profile__user-name']}>{userName}</h2>
                  <p className={styles['profile__user-data']}>{`${userAge}, ${userCity}`}</p>
                </div>
              </div>

              <ProfileMenu />
            </div>
          </div>
          <div
            className={`${styles['profile__column']} ${styles['profile__column-main']} ${styles['profile__column-menu--applications']}`}
          >
            {card1 && <UserCard card={card1} type={'short'} user={user} />}
            {card2 && <UserCard card={card2} type={'short'} user={user} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
