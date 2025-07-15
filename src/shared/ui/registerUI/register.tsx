import type { FC } from 'react';

import styles from './register.module.css';
import type { RegisterUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import { ProgressBar } from '@/widgets';
import huge from '../../../assets/svg/huge-user/huge-user.svg';

export const RegisterUI: FC<RegisterUIProps> = ({
  email,
  setEmail,
  errorText,
  handleSubmit,
  password,
  setPassword
}) => (
  <main className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.ProgressBar}>
        <ProgressBar steps={3} current={1}>
        </ProgressBar>
      </div>
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
          <InputUI
            type='password'
            label='Пароль'
            placeholder='Придумайте надежный пароль'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name='password'
            tip='Пароль должен содержать не менее 8 знаков'
          />
          <div className={styles.buttons}>
            <ButtonUI 
              type='link' 
              to='/registerAboutYou'
              className={classNames(styles.button, styles.link_btn)}
              >
              Далее
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
            <h2 className={styles.title}>Добро пожаловать в SkillSwap!</h2>
            <p>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими пользователями</p>
          </div>
        </div>
      </div>
    </div>
  </main>
);
