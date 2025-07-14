import { type FC } from 'react';

import styles from './registerAboutYou.module.css';
import type { registerAboutYouUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import { ProgressBar } from '@/widgets';

import { UserCircleSVG } from '@/assets/svg/user-circle';
import { PlusCircleSVG } from '@/assets/svg/plus-circle';
import { HugeUserAccountSVG } from '@/assets/svg/huge-user-account';

export const RegisterAboutYouUI: FC<registerAboutYouUIProps> = ({
  name,
  setName,
  gender,
  setGender,
  age,
  setAge,
  city,
  setCity,
  skill,
  setSkill,
  handleSubmit
}) => {
  /*
  type genderType = {
    name: null | 'male' | 'female';
    id: null | '1' | '2';
  };
  const genderOptions: genderType[] = [
    { name: 'male', id: '1' },
    { name: 'female', id: '2' },
  ];
  const [selectedGender, setSelectedGender] = useState<genderType | null>(null);
*/
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.ProgressBar}>
          <ProgressBar steps={3} current={2}>
          </ProgressBar>
        </div>
        <div className={styles.general}>
          <form
            className={styles.general_column}
            name='aboutYou'
            onSubmit={handleSubmit}
          >
          <div className={styles.img_profile}>
            <UserCircleSVG size='60px'/>
            <div className={styles.img_Plus}>
              <PlusCircleSVG size='24px' />
            </div>
          </div> 
            <InputUI
              label='Имя'
              type='text'
              placeholder='Введите ваше имя'
              onChange={(e) => setName(e.target.value)}
              value={name}
              name='name'
              error={false}
              errorText=''
            />
            <div className={styles.gentwo}>
              <InputUI
                label='Возраст'
                type='text'
                placeholder='Введите ваш возраст'
                onChange={(e) => setAge(e.target.value)}
                value={age}
                name='Возраст'  
              />
              <InputUI
                label='Пол'
                type='text'
                placeholder='Введите ваш пол'
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                name='Gender'
              />
            </div>
            <InputUI
                label='Выберите навыки, которым хотите научиться'
                type='text'
                placeholder='Выберите категорию навыка'
                onChange={(e) => setSkill (e.target.value)}
                value={skill}
                name='skill'  
              />
            <InputUI
                label='Город'
                type='text'
                placeholder='Выберите ваш город'
                onChange={(e) => setCity(e.target.value)}
                value={city}
                name='city'  
              />
            <div className={styles.buttons}>
              <ButtonUI 
                type='button' 
                onClick={()=>{}}
                className={classNames(styles.button, styles.message_btn)}
                >
                Назад
              </ButtonUI>
              <ButtonUI 
                type='button' 
                onClick={()=>{}}
                className={classNames(styles.button, styles.link_btn)}
                >
                Продолжить
              </ButtonUI>
            </div> 
          </form>
          <div className={styles.general_column_img}>
            <div className={styles.img_container}>
              <HugeUserAccountSVG width = '150px' height = '150px' />
            </div>
            <div className={styles.text}>
              <h2 className={styles.title}>Расскажите немного о себе</h2>
              <p>Это поможет другим пользователям лучше вас узнать, чтобы выбрать для обмена</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

