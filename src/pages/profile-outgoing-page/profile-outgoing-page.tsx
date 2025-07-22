// src/pages/profile-outgoing-page/profile-outgoing-page.tsx
import { useMemo } from 'react';
import profile from '@/images/profile-avatar.png';
import styles from '@/pages/profile-page/profile-page.module.css';
import { ProfileMenu } from '@/shared/ui/profileMenuUI';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { UserCard } from '@/widgets';
import { useSelector } from '@/services/store';
import { selectUserData, getOffersSent } from '@/services/slices';
import { getCardsState } from '@/services/slices/cardSlice';
import { PreloaderUI } from '@/shared/ui';

export const ProfileOutgoing = () => {
  const user = useSelector(selectUserData);
  const outgoingOffers = useSelector(getOffersSent);
  const allCards = useSelector(getCardsState);

  // Получаем карточки для исходящих заявок
  const outgoingCards = useMemo(() => {
    return outgoingOffers
      .map(offer => allCards.find(card => card.userId === offer.userId))
      .filter(Boolean); // Убираем undefined значения
  }, [outgoingOffers, allCards]);

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
              Исходящие заявки ({outgoingCards.length})
            </h3>
            
            {outgoingCards.length === 0 ? (
              <div className={styles.empty_state}>
                <p>Вы пока не отправляли заявок</p>
              </div>
            ) : (
              <div className={styles.cards_grid}>
                {outgoingCards.map((card) => (
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
