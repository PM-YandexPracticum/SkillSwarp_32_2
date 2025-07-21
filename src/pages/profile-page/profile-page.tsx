import { useState } from 'react';
import { ProfileMenu } from '@/widgets/profileMenu/profileMenu';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { ButtonUI } from '@/shared/ui';
import { USERS_DATA } from '@/shared/global-types/data-users-example';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import type { TCity } from '@/shared/global-types/data-types';
import profile from '../../images/profile-example.png';
import styles from './profile-page.module.css';
import { ProfileForm } from '@/shared/ui/profileForm';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { EditSVG } from '@/assets/svg';

export const ProfilePage = () => {
  const [gender, setGender] = useState<'male' | 'female'>(USERS_DATA[0].gender ?? 'male');

  const cities: DropdownOption[] = CITIES_MOCK.map((city: TCity) => ({
    id: city.id,
    name: city.title,
  }));

  const [selectedCity, setSelectedCity] = useState<DropdownOption | null>(() => {
    const userCityTitle = USERS_DATA[0].city;
    const foundCity = cities.find((city) => city.name === userCityTitle);
    return foundCity ?? null;
  });

  return (
    <main className={styles.main}>
      <div className={styles.profile}>
        <div className={`${styles['profile__column']} ${styles['profile__column-menu']}`}>
          <ProfileMenu />
        </div>

        <div
          className={`${styles['profile__column']} ${styles['profile__column-main']} ${styles['profile__column-main--gap']}`}
        >
          <ProfileForm
            gender={gender}
            setGender={setGender}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
          />

          <div className={styles.profile__avatar}>
            <ProfileAvatar userAvatar={profile} />
            <ButtonUI className={styles['change-photo-btn']} type='button' onClick={() => {}}>
              Изменить фото
              <span className={styles['change-photo-svg']}>
                <EditSVG />
              </span>
            </ButtonUI>
          </div>
        </div>
      </div>
    </main>
  );
};
