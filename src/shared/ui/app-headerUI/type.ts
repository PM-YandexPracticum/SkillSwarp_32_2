// src/shared/ui/app-headerUI/type.ts
import type { TUser } from '@/shared/global-types';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'category' | 'skill';
  categoryType?: string;
}

export type HeaderUserData = Pick<TUser, 'name' | 'image'>;

export type TAppHeaderUIProps = {
  onSkillsClick: () => void;
  onToggleTheme: () => void;
  onNotificationClick?: () => void; // Делаю опциональными
  onLikeClick?: () => void; // Делаю опциональными
  onClearButtonClick: () => void;
  onSearch?: (suggestion: SearchSuggestion) => void; // Использую правильный тип
  // user: HeaderUserData | undefined;
  user: TUser | null;
  isLoginOrRegister: boolean;
};
