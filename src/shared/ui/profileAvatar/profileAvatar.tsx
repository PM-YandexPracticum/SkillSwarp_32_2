import styles from './profileAvatar.module.css';
import type { ProfileAvatarProps } from './type';

export const ProfileAvatar = ({ userAvatar }: ProfileAvatarProps) => {
  return (
    <img src={userAvatar} alt='Аватар пользователя ' className={styles['profile-menu__avatar']} />
  );
};
