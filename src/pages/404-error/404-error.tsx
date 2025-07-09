import { ButtonUI } from '@/shared/ui';
import type { FC } from 'react';
import error404 from '../../assets/images/error-404.png';
import styles from './error-404.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const Error404: FC = () => {
  const navigate = useNavigate();
  const sentErrorMessage = () => {
    /* заглушка */
  };
  return (
    <div className={styles.content}>
      <div className={styles.img_container}>
        <img src={error404} alt='Ошибка 404' className={styles.img} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>Страница не найдена</h2>
          <p>К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже</p>
        </div>
        <div className={styles.buttons}>
          <ButtonUI
            type='button'
            onClick={sentErrorMessage}
            className={classNames(styles.button, styles.message_btn)}
          >
            Сообщить об ошибке
          </ButtonUI>
          <ButtonUI
            type='button'
            onClick={() => navigate('/')}
            className={classNames(styles.button, styles.link_btn)}
          >
            На главную
          </ButtonUI>
        </div>
      </div>
    </div>
  );
};
