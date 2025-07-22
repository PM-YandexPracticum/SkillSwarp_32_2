// src/shared/ui/profileMenuUI/profileMenu.tsx
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
import { useDispatch, useSelector } from 'react-redux';
import { 
  logout, 
  // selectUserData, 
  getOffersSent, 
  getOffersReceived, 
  getLikedCards 
} from '@/services/slices';

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Получаю данные для счетчиков из Redux store
  // const user = useSelector(selectUserData);
  const outgoingOffers = useSelector(getOffersSent);
  const incomingOffers = useSelector(getOffersReceived);
  const likedCards = useSelector(getLikedCards);

  const isActive = (path: string) => location.pathname === path;

  const smoothScrolling = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    smoothScrolling();
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
            {incomingOffers.length > 0 && (
              <span className={styles.counter}>{incomingOffers.length}</span>
            )}
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
            {outgoingOffers.length > 0 && (
              <span className={styles.counter}>{outgoingOffers.length}</span>
            )}
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
          className={`${styles['profile-menu__item']} ${
            isActive('/profile') ? styles.active : ''
          }`}
        >
          <UserFramedSVG />
          <NavLink to='/profile' className={styles.button}>
            Личные данные
          </NavLink>
        </li>

        <li
          className={`${styles['profile-menu__item']} ${
            isActive('/profile/favorites') ? styles.active : ''
          }`}
        >
          <LikeSVG />
          <NavLink to='/profile/favorites' className={styles.button}>
            Избранное
            {likedCards.length > 0 && (
              <span className={styles.counter}>{likedCards.length}</span>
            )}
          </NavLink>
        </li>

        <li className={`${styles['profile-menu__item']}`}>
          <HomeSVG />
          <ButtonUI type='button' onClick={handleLogout}>
            Выйти из аккаунта
          </ButtonUI>
        </li>
      </ul>
    </div>
  );
};
