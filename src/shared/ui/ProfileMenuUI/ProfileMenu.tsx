import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import type { ProfileMenuProps } from './types';

export const ProfileMenu = ({ profileUserInfo, profileMenuItems }: ProfileMenuProps) => {
  return (
    <aside className={styles['profile-menu']}>
      <div className={styles['profile-menu__info']}>
        <img
          src={profileUserInfo.avatar}
          alt='Изображение: аватар пользователя'
          className={styles['profile-menu__avatar']}
        />

        <div className={styles['profile-menu__rating']}>
          {Array(profileUserInfo.rating)
            .fill(0)
            .map((_, i) => (
              <span key={i} className={styles['profile-menu__rating-item']}>
                ★
              </span>
            ))}
        </div>

        <h2 className={styles['profile-menu__user-name']}>{profileUserInfo.user}</h2>
        <div className={styles['profile-menu__user-data']}>{profileUserInfo.userData}</div>
        <p className={styles['profile-menu__description']}>{profileUserInfo.description}</p>
      </div>

      <div className={styles['profile-menu__nav']}>
        <ul className={styles['profile-menu__nav-menu']}>
          {profileMenuItems.map(({ label, href, active }, index) => (
            <li
              key={index}
              className={`${styles['profile-menu__nav-item']} ${
                active ? styles['profile-menu__nav-item--active'] : ''
              }`}
            >
              <Link className={styles['profile-menu__nav-link']} to={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
