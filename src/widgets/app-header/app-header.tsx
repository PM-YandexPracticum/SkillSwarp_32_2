import type { FC } from 'react';
import { AppHeaderUI } from '@/shared/ui/app-headerUI/app-header';
import { useLocation } from 'react-router-dom';
// import { useSelector } from '@/services/store';
// import { userSelectors } from '@/services/slices/user';
// import { USERS_DATA } from '@/shared/global-types/data-users-example';

export const AppHeader: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Определяем, находимся ли мы на страницах регистрации/логина
  const isLoginOrRegister = ['/login', '/register'].includes(currentPath);

  // TODO найти пользователя как добавят селектор в слайс юзера
  // После юзеров для проверки ниже удалить
  // const user = useSelector(userSelectors.userDataSelector);

  // TODO Для проверки
  // const user = USERS_DATA[7];
  const user = {
    name: 'Мария',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  return (
    <AppHeaderUI
      onSkillsClick={() => {}}
      onToggleTheme={() => {}}
      onNotificationClick={() => {}}
      onLikeClick={() => {}}
      onClearButtonClick={() => {}}
      // user={undefined} // Для проверки. В конце убрать
      user={user}
      isLoginOrRegister={isLoginOrRegister}
    />
  );
};
