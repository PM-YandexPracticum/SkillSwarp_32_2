// src/shared/ui/app-headerUI/type.ts
import type { THeaderUserData } from '@/shared/global-types';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'category' | 'skill';
  categoryType?: string;
}

export type TAppHeaderUIProps = {
  onSkillsClick: () => void;
  onToggleTheme: () => void;
  onLikeClick?: () => void; // Делаю опциональными
  onClearButtonClick: () => void;
  onSearch?: (suggestion: SearchSuggestion) => void; // Использую правильный тип
  user: THeaderUserData;
  // user: TUser;
  isLoginOrRegister: boolean;
  isAuthenticated: boolean;
};
