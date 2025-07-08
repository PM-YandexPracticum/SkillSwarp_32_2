import styles from './profileMenu.module.css';
import { Link } from 'react-router-dom';
import type { ProfileMenuProps } from './types';

export const ProfileMenu = ({ profileUserInfo, profileMenuItems }: ProfileMenuProps) => {
  // Добавил простые проверки, чтобы сайт не падал, если с сервера придут некоректные данные
  // Проверка - нет данных пользователя или они неполные
  if (!profileUserInfo) {
    return (
      <aside className={styles['profile-menu']}>
        <div className={styles['profile-menu__info']}>
          <p className={styles['profile-menu__error']}>Ошибка загрузки профиля</p>
        </div>
      </aside>
    );
  }
  // Проверка - меню пришло пустое
  const hasMenuItems = Array.isArray(profileMenuItems) && profileMenuItems.length > 0;

  return (
    <aside className={styles['profile-menu']}>
      <div className={styles['profile-menu__info']}>
        <img
          src={profileUserInfo.avatar}
          alt='Изображение: аватар пользователя'
          className={styles['profile-menu__avatar']}
        />

        <div className={styles['profile-menu__rating']}>
          {Array(profileUserInfo.rating || 0)
            .fill(0)
            .map((_, i) => (
              <span key={i} className={styles['profile-menu__rating-item']}>
                ★
              </span>
            ))}
        </div>

        <h2 className={styles['profile-menu__user-name']}>
          {profileUserInfo.user || 'Имя не указано'}
        </h2>

        <div className={styles['profile-menu__user-data']}>
          {profileUserInfo.userData || 'Данные отсутствуют'}
        </div>

        <p className={styles['profile-menu__description']}>
          {profileUserInfo.description || 'Описание отсутствует'}
        </p>
      </div>

      <div className={styles['profile-menu__nav']}>
        {hasMenuItems ? (
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
        ) : (
          <p className={styles['profile-menu__nav-empty']}>Навигация недоступна</p>
        )}
      </div>
    </aside>
  );
};
