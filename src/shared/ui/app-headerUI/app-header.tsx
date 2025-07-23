// src/shared/ui/app-headerUI/app-header.tsx
import { forwardRef } from 'react';
import styles from './app-header.module.css';
import type { TAppHeaderUIProps } from './type';
import { ButtonUI } from '../buttonUI';
import { LikeSVG } from '@/assets/svg/like';
import { ChevronDownSVG, CrossSVG, LogoVG, MoonSVG } from '@/assets/svg';
// import { NotificationSVG } from '@/assets/svg/notification';
import { SearchFieldUI } from '../search-fieldUI';
import { NotificationListUI } from '../notificationListUI';

export const AppHeaderUI = forwardRef<HTMLElement, TAppHeaderUIProps>(
  (
    {
      onSkillsClick,
      onToggleTheme,
      onLikeClick,
      onClearButtonClick,
      onSearch,
      user,
      isLoginOrRegister,
    },
    ref
  ) => (
    <header className={styles.header} ref={ref}>
      <nav className={styles.nav}>
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
            <SearchFieldUI onReset={onClearButtonClick} onSearch={onSearch} />
            <div className={styles.header_part_right}>
              <ButtonUI
                type='button'
                onClick={onToggleTheme}
                className={styles.button}
                aria-label='Переключение цветовой темы'
              >
                <MoonSVG />
              </ButtonUI>
              {user.id != '' ? (
                <div className={styles.header_logged_in}>
                  <div className={styles.icons}>
                    <NotificationListUI user={user} />
                    {/* Условный рендеринг для опциональных пропсов */}
                    {onLikeClick && (
                      <ButtonUI type='button' onClick={onLikeClick} className={styles.button}>
                        <LikeSVG />
                      </ButtonUI>
                    )}
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
          <ButtonUI type='link' className={`${styles.button} ${styles.close_button}`} to='/'>
            Закрыть
            <CrossSVG />
          </ButtonUI>
        )}
      </nav>
    </header>
  )
);

AppHeaderUI.displayName = 'AppHeaderUI';
