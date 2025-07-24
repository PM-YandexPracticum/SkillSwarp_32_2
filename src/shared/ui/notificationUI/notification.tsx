import styles from './notification.module.css';
import type { TNotificationUIProps } from './type';
import { IdeaSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';

export const NotificationUI = (props: TNotificationUIProps) => {
  const { offer, partnerName, typeOfExchange, partnerGender } = props;

  const currentDate: Date = new Date();
  const notificationDate = new Date(offer.createdAt);
  const timeDifference = currentDate.getTime() - notificationDate.getTime();
  const diffInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const formattedDate = notificationDate
    .toLocaleString('ru', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .replace(/\sг\./, '');

  const shortFormattedDate = notificationDate.toLocaleString('ru', {
    day: '2-digit',
    month: 'long',
  });

  const statusText =
    offer.status === 'fulfilled' && partnerGender === 'male'
      ? 'принял'
      : offer.status === 'fulfilled' && partnerGender === 'female'
        ? 'принялa'
        : offer.status === 'rejected' && partnerGender === 'male'
          ? 'отклонил'
          : offer.status === 'rejected' && partnerGender === 'female'
            ? 'отклонила'
            : 'рассматривает';

  const dateText =
    diffInDays === 0
      ? 'Сегодня'
      : diffInDays === 1
        ? 'Вчера'
        : diffInDays > 365
          ? formattedDate
          : shortFormattedDate;

  return (
    <li className={styles.content}>
      <div className={styles.notification}>
        <IdeaSVG size='40' />
        <div className={styles.message}>
          {typeOfExchange === 'outgoing' && (
            <>
              <p>{`${partnerName} ${statusText} ваш обмен`}</p>
              <p className={styles.note}>Перейдите в профиль, чтобы обсудить детали</p>
            </>
          )}
          {typeOfExchange === 'incoming' && (
            <>
              <p>{`${partnerName} предлагает вам обмен`}</p>
              <p className={styles.note}>Примите обмен, чтобы обсудить детали</p>
            </>
          )}
        </div>
        <p className={styles.date}>{dateText}</p>
      </div>
      {!offer.isRead && (
        <ButtonUI type='link' className={styles.button} to={`/skill/${offer.userId}`}>
          <span>Перейти</span>
        </ButtonUI>
      )}
    </li>
  );
};
