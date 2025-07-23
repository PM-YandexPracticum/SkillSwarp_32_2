// src/pages/profile-page/profile-page.tsx

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { Navigate } from 'react-router-dom';
import { ProfileMenu } from '@/shared/ui/profileMenuUI/profileMenu';
import { ProfileForm } from '@/shared/ui/profileForm';
import { PhotoUploadUI } from '@/shared/ui/photoUploadUI';
import { ButtonUI, PreloaderUI } from '@/shared/ui';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import type { TCity } from '@/shared/global-types/data-types';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import {
  selectUserData,
  updateUserField,
  selectLoading,
  getIsAuthenticated,
} from '@/services/slices/userSlice';
import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const loading = useSelector(selectLoading);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // ВСЕ ХУКИ ДОЛЖНЫ БЫТЬ ЗДЕСЬ, ДО ЛЮБЫХ УСЛОВИЙ!
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

  // ТЕПЕРЬ МОЖНО ДЕЛАТЬ УСЛОВНЫЕ ВОЗВРАТЫ
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <PreloaderUI />;
  }

  const setSelectedCity = (city: DropdownOption<string>) => {
    dispatch(updateUserField({ field: 'city', value: city.name }));
    setHasUnsavedChanges(true);
  };

  const setGender = (gender: 'male' | 'female') => {
    dispatch(updateUserField({ field: 'gender', value: gender }));
    setHasUnsavedChanges(true);
  };

  const setName = (name: string) => {
    dispatch(updateUserField({ field: 'name', value: name }));
    setHasUnsavedChanges(true);
  };

  const setMail = (mail: string) => {
    dispatch(updateUserField({ field: 'mail', value: mail }));
    setHasUnsavedChanges(true);
  };

  const setAge = (age: number) => {
    dispatch(updateUserField({ field: 'age', value: age }));
    setHasUnsavedChanges(true);
  };

  const setDescription = (description: string) => {
    dispatch(updateUserField({ field: 'description', value: description }));
    setHasUnsavedChanges(true);
  };

  const handlePhotoChange = (photo: string | null) => {
    dispatch(updateUserField({ field: 'image', value: photo || '/#' }));
    setHasUnsavedChanges(true);
  };

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
            <PhotoUploadUI
              currentPhoto={user.image !== '/#' ? user.image : undefined}
              onPhotoChange={handlePhotoChange}
              disabled={loading}
              maxSizeInMB={5}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
