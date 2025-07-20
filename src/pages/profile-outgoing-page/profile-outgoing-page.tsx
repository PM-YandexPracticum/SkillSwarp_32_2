import profile from '../../images/profile-example.png';
import styles from '@/pages/profile-page/profile-page.module.css';
import { ProfileMenu } from '@/shared/ui/profileMenuUI';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { UserCard } from '@/widgets';
import { USERS_DATA } from '@/shared/global-types/data-users-example';
import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { Footer } from '@/shared/ui/footer';

export const ProfileOutgoing = () => {
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
                <ProfileAvatar userAvatar={profile} />

                <div className={styles['profile__applications-text']}>
                  <h2 className={styles['profile__user-name']}>{USERS_DATA[0].name}</h2>
                  <p
                    className={styles['profile__user-data']}
                  >{`${USERS_DATA[0].age}, ${USERS_DATA[0].city}`}</p>
                </div>
              </div>

              <ProfileMenu />
            </div>
          </div>

          <div
            className={`${styles['profile__column']} ${styles['profile__column-main']} ${styles['profile__column-menu--applications']}`}
          >
            <UserCard card={CARDS_DATA[10]} type={'short'} />
            <UserCard card={CARDS_DATA[20]} type={'short'} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
