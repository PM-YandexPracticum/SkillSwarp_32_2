import { useMemo } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { ProfileMenu } from '@/shared/ui/profileMenuUI/profileMenu';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { ButtonUI } from '@/shared/ui';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import type { TCity } from '@/shared/global-types/data-types';
import styles from './profile-page.module.css';
import { ProfileForm } from '@/shared/ui/profileForm';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { EditSVG } from '@/assets/svg';
import { selectUserData, updateUserField } from '@/services/slices/userSlice';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const cities: DropdownOption<string>[] = useMemo(
    () =>
      CITIES_MOCK.map((city: TCity) => ({
        id: city.id,
        name: city.title,
      })),
    []
  );

  const selectedCity = useMemo(() => {
    return (
      cities.find((city) => city.name === user.city) ?? {
        id: '',
        name: user.city,
      }
    );
  }, [user.city, cities]);

  const setSelectedCity = (city: DropdownOption<string>) =>
    dispatch(updateUserField({ field: 'city', value: city.name }));

  const setGender = (gender: 'male' | 'female') =>
    dispatch(updateUserField({ field: 'gender', value: gender }));

  const setName = (name: string) => dispatch(updateUserField({ field: 'name', value: name }));

  const setMail = (mail: string) => dispatch(updateUserField({ field: 'mail', value: mail }));

  const setAge = (age: number) => dispatch(updateUserField({ field: 'age', value: age }));

  const setDescription = (description: string) =>
    dispatch(updateUserField({ field: 'description', value: description }));

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
            gender={user.gender}
            setGender={setGender}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            mail={user.mail}
            setMail={setMail}
            name={user.name}
            setName={setName}
            age={user.age}
            setAge={setAge}
            description={user.description}
            setDescription={setDescription}
          />

          <div className={styles.profile__avatar}>
            <ProfileAvatar userAvatar={user.image} />{' '}
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
