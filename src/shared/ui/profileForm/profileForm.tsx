import { useState, type FC } from 'react';
import { InputUI, ButtonUI } from '@/shared/ui';

import styles from './profileForm.module.css';
import { USERS_DATA } from '@/shared/global-types/data-users-example';
import { DropdownUI } from '../dropdownUI';
import { EditSVG } from '@/assets/svg';
import type { ProfileFormProps } from './type';

export const ProfileForm: FC<ProfileFormProps> = ({
  gender,
  setGender,
  selectedCity,
  setSelectedCity,
  cities,
}) => {
  const [mail, setMail] = useState(USERS_DATA[0].mail);
  const [name, setName] = useState(USERS_DATA[0].name);
  const [age, setAge] = useState(USERS_DATA[0].age);
  const [description, setDescription] = useState(USERS_DATA[0].description);
  // Вместо USERS_DATA[0] будут данные из сервера. Так же и в остальных файлах

  return (
    <div className={styles['profile-form-container']}>
      <div className={styles['input-wrapper']}>
        <InputUI
          label='Почта'
          type='email'
          placeholder='Введите E-mail'
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          name='mail'
        />
        <span className={styles['edit-wrapper']}>
          <EditSVG />
        </span>
      </div>

      <div className={styles['input-wrapper']}>
        <InputUI
          label='Имя'
          type='text'
          placeholder='Введите имя'
          onChange={(e) => setName(e.target.value)}
          value={name}
          name='name'
        />
        <span className={styles['edit-wrapper']}>
          <EditSVG />
        </span>
      </div>

      <div className={styles['age-gender-row']}>
        <InputUI
          label='Возраст'
          type='number'
          min={0}
          max={130}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 0 && value <= 130) {
              setAge(value);
            }
          }}
          value={age}
          name='age'
        />

        <div className={styles['gender-container']}>
          <span className={styles['gender-label']}>Пол</span>
          <div className={styles['gender-toggle']}>
            <ButtonUI
              type='button'
              onClick={() => setGender('male')}
              className={`${styles['gender-button']} ${gender === 'male' ? styles['active'] : ''}`}
            >
              Муж
            </ButtonUI>
            <ButtonUI
              type='button'
              onClick={() => setGender('female')}
              className={`${styles['gender-button']} ${gender === 'female' ? styles['active'] : ''}`}
            >
              Жен
            </ButtonUI>
          </div>
        </div>
      </div>

      <div className={styles['input-wrapper']}>
        <label className={styles['input-label']}>Город</label>
        <DropdownUI
          value={selectedCity || { id: '', name: 'Выберите город' }}
          withFilter
          placeholder='Выберите город'
        >
          {({ filter }) =>
            cities
              .filter((city) => city.name.toLowerCase().includes(filter.toLowerCase()))
              .map((city) => (
                <li
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={city.id === selectedCity?.id ? styles.activeOption : ''}
                  tabIndex={0}
                  role='option'
                  aria-selected={city.id === selectedCity?.id}
                >
                  {city.name}
                </li>
              ))
          }
        </DropdownUI>
      </div>

      <div className={styles['input-wrapper']}>
        <InputUI
          label='О себе'
          type='textarea'
          onChange={(e) => setDescription(e.target.value)}
          value={description ?? ''}
          name='description'
        />
        <span className={styles['edit-wrapper']}>
          <EditSVG />
        </span>
      </div>
    </div>
  );
};
