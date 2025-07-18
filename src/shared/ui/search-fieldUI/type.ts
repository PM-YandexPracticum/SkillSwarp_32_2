// src/shared/ui/search-fieldUI/type.ts
interface SearchSuggestion {
  id: string;
  title: string;
  type: 'category' | 'skill';
  categoryType?: string;
}

export type SearchFieldUIProps = {
  onReset: () => void;
  onSearch?: (suggestion: SearchSuggestion) => void;
};

export type { SearchSuggestion };
