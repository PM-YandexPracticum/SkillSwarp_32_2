import styles from './footer.module.css';
import footerLogo from '../../../assets/svg/footer-logo.svg';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__branding']}>
        <div className={styles['footer__logo']}>
          <img src={footerLogo} alt='Логотип компании' />
        </div>
        <div className={styles['footer__copyright']}>SkillSwap – 2025</div>
      </div>

      <nav className={styles['footer__nav']} aria-label='Основные ссылки сайта'>
        <ul className={styles['footer__nav-list']}>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              О проекте
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              Контакты
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              Политика конфиденциальности
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              Все навыки
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              Блог
            </a>
          </li>
          <li className={styles['footer__nav-item']}>
            <a className={styles['footer__nav-link']} href='#'>
              Пользовательское соглашение
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
