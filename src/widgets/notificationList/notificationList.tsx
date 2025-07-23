import styles from './notificationList.module.css';
import { useRef, useState } from 'react';
import { ButtonUI } from '@/shared/ui';
import { NotificationSVG } from '@/assets/svg/notification';
import { NotificationUI } from '@/shared/ui/notificationUI';
import type { ExtendedOfferSkillType, GroupedNotifications, TNotificationListProps } from './type';
import clsx from 'clsx';
import React from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { getCardsState } from '@/services/slices';
import { useSelector } from 'react-redux';
import { getCardForUserId } from '@/shared/lib/helpers/helpers';

export const NotificationList: React.FC<TNotificationListProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const cards = useSelector(getCardsState);

  // Обработчик клика вне выпадающего окна
  useOutsideClickClose({
    isOpen,
    onChange: setIsOpen,
    rootRef: rootRef,
  });

  const handleNotificationToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Собираем все уведомления из incoming и outgoing
  const allNotifications = [
    ...user.incoming.map((n) => ({ ...n, type: 'incoming' }) as ExtendedOfferSkillType),
    ...user.outgoing.map((n) => ({ ...n, type: 'outgoing' }) as ExtendedOfferSkillType),
  ];

  // Группируем уведомления в группы Новые и Просмотренные
  const groupedNotifications: GroupedNotifications = allNotifications.reduce(
    (acc, notification) => {
      const isNew = !notification.isRead;
      acc[isNew ? 'new' : 'read'].push(notification);
      return acc;
    },
    { new: [], read: [] } as { new: ExtendedOfferSkillType[]; read: ExtendedOfferSkillType[] }
  );

  // Берем только первые 2 элемента в каждой группе (для рендера)
  const limitedNotifications: GroupedNotifications = {
    new: groupedNotifications.new.slice(0, 2),
    read: groupedNotifications.read.slice(0, 2)
  };

  return (
    <div className={styles.notifications} ref={rootRef} data-is-active={isOpen}>
      <ButtonUI
        type='button'
        className={clsx(styles.notification_button, {
          [styles.has_new]: groupedNotifications.new.length > 0,
        })}
        onClick={handleNotificationToggle}
      >
        <NotificationSVG />
        {groupedNotifications.new.length > 0 && (
          <span className={styles.notifications_alarm}></span>
        )}
      </ButtonUI>
      {isOpen && (
        <div className={styles.notifications_list}>
          {Object.entries(limitedNotifications).map(([group, notifs]) => (
            <div key={group} className={styles.notifications_group}>
              <div className={styles.notifications_heading}>
                <h3 className={styles.notifications_title}>
                  {group === 'new' ? 'Новые уведомления' : 'Просмотренные'}
                </h3>
                {group === 'new' && notifs.length > 0 && (
                  <ButtonUI type='link' className={styles.notifications_group_button} to='/profile'>
                    Прочитать все
                  </ButtonUI>
                )}
                {group === 'read' && notifs.length > 0 && (
                  <ButtonUI
                    type='button'
                    className={styles.notifications_group_button}
                    onClick={() => {}} // Заглушка
                  >
                    Очистить
                  </ButtonUI>
                )}
              </div>
              {notifs.length > 0 ? (
                <ul className={styles.notifications_items}>
                  {notifs.map((notification: ExtendedOfferSkillType) => (
                    <NotificationUI
                      key={notification.userId}
                      offer={notification}
                      typeOfExchange={notification.type}
                      partnerName={getCardForUserId(notification.userId, cards)?.name || ''}
                      partnerGender={getCardForUserId(notification.userId, cards)?.gender || 'male'}
                    />
                  ))}
                </ul>
              ) : (
                <p className={styles.no_notifications}>Уведомлений нет</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
