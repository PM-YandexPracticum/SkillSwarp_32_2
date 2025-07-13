import type { FC } from 'react';

import styles from './login.module.css';
import type { LoginUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import huge from '../../../assets/svg/huge-user/huge-user.svg';

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword
}) => (
  <main className=''>
    <div className={styles.wrapper}>
      <h1 className={styles.head_title}>Вход</h1>
      <div className={styles.general}>
        <form
          className={styles.general_column}
          name='login'
          onSubmit={handleSubmit}
        >
          <div className={styles.buttons}>
            <ButtonUI
              type='button'
              onClick={()=>{}}
              className={classNames(styles.button, styles.message_btn)}
              >
              Продолжить с Google
            </ButtonUI>
          </div>
          <div className={styles.buttons}>
            <ButtonUI
              type='button'
              onClick={()=>{}}
              className={classNames(styles.button, styles.message_btn)}
              >
              Продолжить с Apple
            </ButtonUI>
          </div>          
          <div className={styles.line}>
            <span className={styles.line_text}>Или</span>
          </div>
          <div className={styles.input}>
            <InputUI
              label='E-mail'
              type='email'
              placeholder='Введите E-mail'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name='email'
              error={false}
              errorText=''
            />
          </div>
          <div className={styles.input}>
            <InputUI
              type='password'
              label='Пароль'
              placeholder='Введите ваш пароль'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name='password'
              error={false}
              errorText='Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
            />
          </div>
          <div className={styles.buttons}>
            <ButtonUI 
              type='button' 
              onClick={()=>{}}
              className={classNames(styles.button, styles.link_btn)}
              >
              Войти
            </ButtonUI>
          </div>
          {errorText && (
            <p className={`${styles.error}`}>
              {errorText}
            </p>
          )}    
        </form>
        <div className={styles.general_column_img}>
          <div className={styles.img_container}>
            <img src={huge} alt='Профиль человека' className={styles.img} />
          </div>
          <div className={styles.text}>
            <h2 className={styles.title}>С возвращением в SkillSwap!</h2>
            <p>Обменивайтесь знаниями и навыками с другими пользователями</p>
          </div>
        </div>
      </div>
    </div>
  </main>
);
