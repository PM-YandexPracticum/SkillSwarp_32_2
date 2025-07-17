// src/widgets/notification-button/notification-button.tsx
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui';
import { NotificationSVG } from '@/assets/svg/notification';
import styles from './notification-button.module.css';

interface NotificationButtonProps {
  onClick: () => void;
  className?: string;
  hasNotifications?: boolean;
}

export const NotificationButton: FC<NotificationButtonProps> = ({ 
  onClick, 
  className, 
  hasNotifications = false 
}) => {
  return (
    <ButtonUI
      type='button'
      onClick={onClick}
      className={`${styles.notification_button} ${className || ''}`}
      aria-label='Уведомления'
    >
      <div className={styles.icon_wrapper}>
        <NotificationSVG />
        {hasNotifications && <div className={styles.notification_dot} />}
      </div>
    </ButtonUI>
  );
};
