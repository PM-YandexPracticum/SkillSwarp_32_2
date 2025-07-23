// src/widgets/app-header/app-header.tsx
import { useRef, useState, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@/shared/ui/app-headerUI/app-header';
import { AllSkills } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { getSkillsState, selectUserData, toggleSkillsFilter } from '@/services/slices';
import type { TMainSkillFilter } from '@/shared/global-types';

// Определяю тип SearchSuggestion локально, чтобы избежать проблем с импортами
interface SearchSuggestion {
  id: string;
  title: string;
  type: 'category' | 'skill';
  categoryType?: string;
}

export const AppHeader: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const skillList = useSelector(getSkillsState);
  const isLoginOrRegister = ['/login', '/register'].includes(currentPath);

  // TODO найти пользователя как добавят селектор в слайс юзера
  // const user = useSelector(userSelectors.userDataSelector);

  // TODO Для проверки
  // const user = USERS_DATA[7];
  const user = useSelector(selectUserData);
  

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
    // TODO: Добавить логику сброса поиска
  };

  const handleSearch = (suggestion: SearchSuggestion) => {
    // Обрабатываем выбор из поиска

    if (suggestion.type === 'category') {
      // Если выбрана категория, активируем все навыки в этой категории
      const updatedFilters = skillList.map((category) =>
        category.id === suggestion.id
          ? {
              ...category,
              subFilters: category.subFilters.map((skill) => ({
                ...skill,
                status: true,
              })),
            }
          : category
      );
      dispatch(toggleSkillsFilter(updatedFilters));
    } else {
      // Если выбран конкретный навык, активируем только его
      const updatedFilters = skillList.map((category) => ({
        ...category,
        subFilters: category.subFilters.map((skill) => ({
          ...skill,
          status: skill.id === suggestion.id ? true : skill.status,
        })),
      }));
      dispatch(toggleSkillsFilter(updatedFilters));
    }
  };

  const handleLikeClick = () => {
    // TODO: Добавить логику обработки лайков
  };

  return (
    <>
      <header ref={headerRef}>
        <AppHeaderUI
          onSkillsClick={toggleAllSkills}
          onToggleTheme={() => {}}
          onLikeClick={handleLikeClick}
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
