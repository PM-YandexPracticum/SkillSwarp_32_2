import styles from './profileMenu.module.css';
import {
  HomeSVG,
  IdeaSVG,
  IncomingSVG,
  LikeSVG,
  OutgoingSVG,
  StarSVG,
  UserFramedSVG,
} from '@/assets/svg';
import { NavLink, useLocation } from 'react-router-dom';
import { ButtonUI } from '../buttonUI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '@/services/slices';

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigate = useNavigate();

  const smoothScrolling = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles['profile-menu']}>
      <ul className={styles['profile-menu__list']}>
        <li
          className={`${styles['profile-menu__item']} ${
            isActive('/profile/incoming') ? styles.active : ''
          }`}
        >
          <IncomingSVG />
          <NavLink to='/profile/incoming' className={styles.button} onClick={smoothScrolling}>
            Входящие заявки
          </NavLink>
        </li>

        <li
          className={`${styles['profile-menu__item']} ${
            isActive('/profile/outgoing') ? styles.active : ''
          }`}
        >
          <OutgoingSVG />
          <NavLink to='/profile/outgoing' className={styles.button} onClick={smoothScrolling}>
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

        <li className={`${styles['profile-menu__item']} `}>
          <HomeSVG />
          <ButtonUI
            type='button'
            onClick={() => {
              {
                dispatch(logout());
                /* Вписать сюда логику разлогина, когда таковая появится */
                // Логика должна быть обёрнута в проверку в духе:
                // if (логика разлогина === 'success') {
                // navigate('/login');
                // smoothScrolling();
                // }
              }
              navigate('/login');
              smoothScrolling();
            }}
          >
            Выйти из аккаунта
          </ButtonUI>
        </li>
      </ul>
    </div>
  );
};
