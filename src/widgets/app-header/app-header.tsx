// src/widgets/app-header/app-header.tsx
import { useRef, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@/shared/ui/app-headerUI/app-header';
import { AllSkills } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getSkillsState, toggleSkillsFilter } from '@/services/slices';
import type { TMainSkillFilter } from '@/shared/global-types';
import type { SearchSuggestion } from '@/shared/ui/search-fieldUI/type';

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const skillList = useSelector(getSkillsState);
  const isLoginOrRegister = ['/login', '/register'].includes(currentPath);

  // TODO найти пользователя как добавят селектор в слайс юзера
  const user = {
    name: 'Мария',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const headerRef = useRef<HTMLElement>(null);
  const [isAllSkillsVisible, setIsAllSkillsVisible] = useState(false);

  const toggleAllSkills = () => {
    setIsAllSkillsVisible((prev) => !prev);
  };

  const handleCloseSkills = () => {
    setIsAllSkillsVisible(false);
  };

  const handleSelectFilter = (data: TMainSkillFilter[]) => {
    dispatch(toggleSkillsFilter(data));
  };

  const handleClearSearch = () => {
    // Сбрасываем все фильтры при очистке поиска
    // Можно добавить отдельный экшен для сброса только поиска
    console.log('Очистка поиска');
  };

  const handleSearch = (suggestion: SearchSuggestion) => {
    // Обрабатываем выбор из поиска
    console.log('Выбран элемент поиска:', suggestion);
    
    if (suggestion.type === 'category') {
      // Если выбрана категория, активируем все навыки в этой категории
      const updatedFilters = skillList.map(category => 
        category.id === suggestion.id
          ? {
              ...category,
              subFilters: category.subFilters.map(skill => ({
                ...skill,
                status: true
              }))
            }
          : category
      );
      dispatch(toggleSkillsFilter(updatedFilters));
    } else {
      // Если выбран конкретный навык, активируем только его
      const updatedFilters = skillList.map(category => ({
        ...category,
        subFilters: category.subFilters.map(skill => ({
          ...skill,
          status: skill.id === suggestion.id ? true : skill.status
        }))
      }));
      dispatch(toggleSkillsFilter(updatedFilters));
    }
  };

  return (
    <>
      <header ref={headerRef}>
        <AppHeaderUI
          onSkillsClick={toggleAllSkills}
          onToggleTheme={() => {}}
          onNotificationClick={() => {}}
          onLikeClick={() => {}}
          onClearButtonClick={handleClearSearch}
          onSearch={handleSearch}
          user={user}
          isLoginOrRegister={isLoginOrRegister}
        />
      </header>
      {isAllSkillsVisible && (
        <AllSkills
          onClose={handleCloseSkills}
          mainFilters={skillList}
          headerRef={headerRef}
          onSelect={handleSelectFilter}
        />
      )}
    </>
  );
};
