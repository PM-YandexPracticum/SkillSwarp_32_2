import defaultAvatar from '@/images/profile-avatar.png';
import styles from './profileAvatar.module.css';
import type { ProfileAvatarProps } from './type';

export const ProfileAvatar = ({ userAvatar }: ProfileAvatarProps) => {
  const avatarToShow =
    typeof userAvatar === 'string' && userAvatar.trim() !== '' ? userAvatar : defaultAvatar;

  return (
    <img
      src={avatarToShow}
      alt='Аватар пользователя'
      className={styles['profile-menu__avatar']}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = defaultAvatar;
      }}
    />
  );
};
