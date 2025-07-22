// src/pages/profile-page/profile-page.tsx
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { ProfileMenu } from '@/shared/ui/profileMenuUI/profileMenu';
import { ProfileAvatar } from '@/shared/ui/profileAvatar';
import { ButtonUI, PreloaderUI } from '@/shared/ui';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import type { TCity } from '@/shared/global-types/data-types';
import styles from './profile-page.module.css';
import { ProfileForm } from '@/shared/ui/profileForm';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { EditSVG } from '@/assets/svg';
import {
  selectUserData,
  updateUserField,
  editUserDataThunk,
  selectLoading,
  getIsAuthenticated,
} from '@/services/slices/userSlice';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const loading = useSelector(selectLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<string>(user.image || '');

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (loading) {
    return <PreloaderUI />;
  }

  if (!user.id && !loading) {
    return <Navigate to='/login' replace />;
  }

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
        name: user.city || 'Выберите город',
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
        dispatch(updateUserField({ field: 'image', value: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await dispatch(
        editUserDataThunk({
          userData: {
            name: user.name,
            age: user.age,
            mail: user.mail,
            password: user.password,
            city: user.city,
            description: user.description || '',
            gender: user.gender,
            image: avatar,
            incoming: user.incoming,
            outgoing: user.outgoing,
            userId: user.userId,
            fullDescription: user.fullDescription,
            likes: user.likes,
          },
          userId: user.id,
        })
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
    }
  };

  const handleCancelEdit = () => {
    setAvatar(user.image || '');
    setIsEditing(false);
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
            description={user.description || ''}
            setDescription={setDescription}
          />

          <div className={styles.profile__avatar}>
            <ProfileAvatar userAvatar={avatar} />

            {isEditing ? (
              <>
                <label htmlFor='avatar-upload' className={styles['change-photo-btn']}>
                  Изменить фото
                  <span className={styles['change-photo-svg']}>
                    <EditSVG />
                  </span>
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                </label>

                <div className={styles.edit_buttons}>
                  <ButtonUI
                    type='button'
                    onClick={handleSaveProfile}
                    className={styles['save-btn']}
                    disabled={loading}
                  >
                    {loading ? 'Сохранение...' : 'Сохранить'}
                  </ButtonUI>
                  <ButtonUI
                    type='button'
                    onClick={handleCancelEdit}
                    className={styles['cancel-btn']}
                    disabled={loading}
                  >
                    Отмена
                  </ButtonUI>
                </div>
              </>
            ) : (
              <>
                <label htmlFor='avatar-upload-view' className={styles['change-photo-btn']}>
                  Изменить фото
                  <span className={styles['change-photo-svg']}>
                    <EditSVG />
                  </span>
                  <input
                    id='avatar-upload-view'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    style={{ display: 'none' }}
                  />
                </label>

                <ButtonUI
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className={styles['edit-btn']}
                >
                  Редактировать профиль
                </ButtonUI>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
