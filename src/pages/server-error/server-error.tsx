import { ButtonUI } from '@/shared/ui';
import type { FC } from 'react';
import error500Img from '../../assets/images/error-500.png';
import styles from './server-error.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

export const ServerError: FC = () => {
  const navigate = useNavigate();
  const sentErrorMessage = () => {
    /* Пока просто заглушка */
  };
  return (
    <div className={styles.content}>
      <div className={styles.img_container}>
        <img src={error500Img} alt='Ошибка 500' className={styles.img} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          <h2 className={styles.title}>На сервере произошла ошибка</h2>
          <p>Попробуйте позже или вернитесь на главную страницу</p>
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
