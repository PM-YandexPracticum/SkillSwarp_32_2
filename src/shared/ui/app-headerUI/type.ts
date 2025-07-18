// type.ts
export interface TAppHeaderUIProps {
  onSkillsClick: () => void;
  onToggleTheme: () => void; // Исправил опечатку в типе
  onNotificationClick?: () => void;
  onLikeClick?: () => void;
  onClearButtonClick: () => void;
  
  // Новые пропсы для поиска с саджестом
  onSearch?: (query: string) => void;
  searchSuggestions?: Array<{
    id: string;
    title: string;
    category?: string;
  }>;
  onSuggestionClick?: (suggestion: {
    id: string;
    title: string;
    category?: string;
  }) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  
  user?: {
    name: string;
    image: string;
  };
  isLoginOrRegister?: boolean;
}
