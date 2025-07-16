import styles from './profileMenu.module.css';
import { IdeaSVG, IncomingSVG, LikeSVG, OutgoingSVG, StarSVG, UserFramedSVG } from '@/assets/svg';
import { NavLink, useLocation } from 'react-router-dom';

export const ProfileMenu = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles['profile-menu']}>
      <ul className={styles['profile-menu__list']}>
        <li
          className={`${styles['profile-menu__item']} ${
            isActive('/profile/incoming') ? styles.active : ''
          }`}
        >
          <IncomingSVG />
          <NavLink to='/profile/incoming' className={styles.button}>
            Входящие заявки
          </NavLink>
        </li>

        <li
          className={`${styles['profile-menu__item']} ${
            isActive('/profile/outgoing') ? styles.active : ''
          }`}
        >
          <OutgoingSVG />
          <NavLink to='/profile/outgoing' className={styles.button}>
            Исходящие заявки
          </NavLink>
        </li>

        <li className={styles['profile-menu__item']}>
          <StarSVG />
          <NavLink to='#' className={styles.button}>
            Активные сессии
          </NavLink>
        </li>

        <li className={styles['profile-menu__item']}>
          <IdeaSVG />
          <NavLink to='#' className={styles.button}>
            Мои навыки
          </NavLink>
        </li>

        <li
          className={`${styles['profile-menu__item']} ${isActive('/profile') ? styles.active : ''}`}
        >
          <UserFramedSVG />
          <NavLink to='/profile' className={styles.button}>
            Личные данные
          </NavLink>
        </li>

        <li className={styles['profile-menu__item']}>
          <LikeSVG />
          <NavLink to='#' className={styles.button}>
            Избранное
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
