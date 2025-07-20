import styles from './notificationList.module.css';
import { useRef, useState } from 'react';
import { ButtonUI } from '../buttonUI';
import { NotificationSVG } from '@/assets/svg/notification';
import { NotificationUI } from '../notificationUI';
import type { ExtendedOfferSkillType, GroupedNotifications, TNotificationListUIProps } from './type';
import clsx from 'clsx';
import React from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export const NotificationListUI: React.FC<TNotificationListUIProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // TODO Заглушки. После доработок слайсов заменить на поиск данных по userId
  const partnerName = 'Татьяна';
  const partnerGender = 'female';

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

  const groupedNotifications: GroupedNotifications = allNotifications.reduce(
    (acc, notification) => {
      const isNew = !notification.isRead;
      acc[isNew ? 'new' : 'read'].push(notification);
      return acc;
    },
    { new: [], read: [] } as { new: ExtendedOfferSkillType[]; read: ExtendedOfferSkillType[] }
  );

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
          {Object.entries(groupedNotifications).map(([group, notifs]) => (
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
                      isRead={notification.isRead}
                      typeOfExchange={notification.type}
                      partnerName={partnerName}
                      partnerGender={partnerGender}
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
