// src/pages/profile-favorites-page/profile-favorites-page.tsx
import { useMemo } from 'react';
import profile from '@/images/profile-avatar.png';
import styles from '@/pages/profile-page/profile-page.module.css';
import { ProfileMenu } from '@/shared/ui/profileMenuUI';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { UserCard } from '@/widgets';
import { useSelector } from '@/services/store';
import { selectUserData, getLikedCards } from '@/services/slices';
import { getCardsState } from '@/services/slices/cardSlice';
import { PreloaderUI } from '@/shared/ui';

export const ProfileFavorites = () => {
  const user = useSelector(selectUserData);
  const likedCardIds = useSelector(getLikedCards);
  const allCards = useSelector(getCardsState);

  // Получаем карточки для избранного
  const favoriteCards = useMemo(() => {
    return allCards.filter(card => likedCardIds.includes(card.userId));
  }, [likedCardIds, allCards]);

  const userName = user?.name || 'Имя';
  const userAge = user?.age || 'Возраст';
  const userCity = user?.city || 'Город';

  if (!user.id) {
    return <PreloaderUI />;
  }

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
          <div className={styles.applications_container}>
            <h3 className={styles.applications_title}>
              Избранное ({favoriteCards.length})
            </h3>
            
            {favoriteCards.length === 0 ? (
              <div className={styles.empty_state}>
                <p>У вас пока нет избранных карточек</p>
                <p>Лайкните карточки пользователей, чтобы они появились здесь</p>
              </div>
            ) : (
              <div className={styles.cards_grid}>
                {favoriteCards.map((card) => (
                  <UserCard key={card.id} card={card} type={'short'} user={user} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
