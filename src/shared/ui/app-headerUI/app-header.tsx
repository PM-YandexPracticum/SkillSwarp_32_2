import type { FC } from 'react';
import styles from './app-header.module.css';
import type { TAppHeaderUIProps } from './type';
import { ButtonUI } from '../buttonUI';
import { ChevronDownSVG, CrossSVG, LogoVG } from '@/assets/svg';
import { SearchFieldUI } from '../search-fieldUI';
import { ThemeButton, NotificationButton, LikeButton } from '@/widgets';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  onSkillsClick,
  onToggleTheme,
  onNotificationClick,
  onClearButtonClick,
  user,
  isLoginOrRegister,
}) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      {/* ToDo: Заменить по готовности кнопки на компоненты */}
      <ButtonUI type='link' className={styles.logo} to='/'>
        <LogoVG size='40' />
        <span>SkillSwap</span>
      </ButtonUI>
      {!isLoginOrRegister ? (
        <>
          <div className={styles.header_part_left}>
            <ButtonUI type='link' className={styles.button} to='#'>
              О проекте
            </ButtonUI>
            <ButtonUI type='button' onClick={onSkillsClick} className={styles.button}>
              <span>Все навыки</span>
              <ChevronDownSVG />
            </ButtonUI>
          </div>
          <SearchFieldUI onReset={onClearButtonClick} />
          <div className={styles.header_part_right}>
            <ThemeButton
              onClick={onToggleTheme} 
              className={styles.button} 
            />
            {user ? (
              <div className={`${styles.header_logged_in}`}>
                <div className={styles.icons}>
                  <NotificationButton 
                    onClick={onNotificationClick}
                    className={styles.button}
                    hasNotifications={true}
                  />
                  <LikeButton 
                    type="link"
                    to="/favorites"
                    className={styles.button}
                  />
                </div>
                <ButtonUI type='link' className={styles.button} to='/profile'>
                  <p>{user.name}</p>
                  <div className={styles.profile__image}>
                    <img src={user.image} alt='фотография пользователя' />
                  </div>
                </ButtonUI>
              </div>
            ) : (
              <div className={styles.header_logged_out}>
                <ButtonUI
                  type='link'
                  className={`${styles.button} ${styles.button_primary}`}
                  to='/login'
                >
                  Войти
                </ButtonUI>
                <ButtonUI
                  type='link'
                  className={`${styles.button} ${styles.button_secondary}`}
                  to='/register'
                >
                  Зарегистрироваться
                </ButtonUI>
              </div>
            )}
          </div>
        </>
      ) : (
        <ButtonUI
          type='link'
          className={`${styles.button} ${styles.close_button}`}
          to='/'
        >
          Закрыть
          <CrossSVG />
        </ButtonUI>
      )}
    </nav>
  </header>
);
