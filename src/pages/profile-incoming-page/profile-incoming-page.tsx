import profile from '@/images/profile-avatar.png';
import styles from '@/pages/profile-page/profile-page.module.css';
import { ProfileMenu } from '@/shared/ui/profileMenuUI';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { UserCard } from '@/widgets';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { useSelector } from 'react-redux';
import { selectUserData } from '@/services/slices';

export const ProfileIncoming = () => {
  const user = useSelector(selectUserData);

  const userName = user?.name || 'Имя';
  const userAge = user?.age || 'Возраст';
  const userCity = user?.city || 'Город';

  return (
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
          <UserCard card={CARDS_DATA[10]} type={'short'} user={user} />
          <UserCard card={CARDS_DATA[11]} type={'short'} user={user} />
        </div>
      </div>
    </main>
  );
};
