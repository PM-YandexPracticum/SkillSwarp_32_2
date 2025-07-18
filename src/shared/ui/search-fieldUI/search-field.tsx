// src/shared/ui/search-fieldUI/search-field.tsx
import { CrossSVG, SearchSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';
import styles from './search-field.module.css';
import type { SearchFieldUIProps } from './type';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from '@/services/store';
import { getSkillsState } from '@/services/slices';
import type { TMainSkillFilter, TSkillSubFilter } from '@/shared/global-types';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'category' | 'skill';
  categoryType?: string;
}

export const SearchFieldUI = ({ onReset, onSearch }: SearchFieldUIProps) => {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const skillFilters = useSelector(getSkillsState);

  // Создаем список всех доступных вариантов для поиска
  const getAllSearchOptions = (): SearchSuggestion[] => {
    const options: SearchSuggestion[] = [];
    
    skillFilters.forEach((category: TMainSkillFilter) => {
      // Добавляем категорию
      options.push({
        id: category.id,
        title: category.title,
        type: 'category',
        categoryType: category.type
      });
      
      // Добавляем подкатегории (навыки)
      category.subFilters.forEach((skill: TSkillSubFilter) => {
        options.push({
          id: skill.id,
          title: skill.title,
          type: 'skill',
          categoryType: category.type
        });
      });
    });
    
    return options;
  };

  // Фильтруем варианты на основе введенного текста
  const filterSuggestions = (query: string): SearchSuggestion[] => {
    if (!query.trim()) return [];
    
    const allOptions = getAllSearchOptions();
    const filtered = allOptions.filter(option =>
      option.title.toLowerCase().includes(query.toLowerCase())
    );
    
    // Ограничиваем количество результатов
    return filtered.slice(0, 8);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    const filteredSuggestions = filterSuggestions(newValue);
    setSuggestions(filteredSuggestions);
    setIsDropdownOpen(filteredSuggestions.length > 0);
    setSelectedIndex(-1);
  };

  const handleReset = () => {
    setValue('');
    setSuggestions([]);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    onReset?.();
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setValue(suggestion.title);
    setIsDropdownOpen(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    
    // Вызываем callback для фильтрации
    onSearch?.(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Закрываем dropdown при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryIcon = (categoryType?: string) => {
    // Здесь можно добавить иконки для разных категорий
    const icons: Record<string, string> = {
      business: '💼',
      art: '🎨',
      languages: '🌍',
      education: '📚',
      home: '🏠',
      lifestyle: '💪'
    };
    return icons[categoryType || ''] || '📋';
  };

  return (
    <div className={styles.search_container} ref={dropdownRef}>
      <label className={styles.input_wrapper}>
        <span className={styles.search_icon}>
          <SearchSVG color='var(--caption-redesigned)' />
        </span>
        <input
          ref={inputRef}
          className={styles.input}
          type='text'
          placeholder='Искать навык или категорию'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsDropdownOpen(true);
            }
          }}
        />
        {value && (
          <ButtonUI type='button' onClick={handleReset} className={styles.clear_button}>
            <CrossSVG />
          </ButtonUI>
        )}
      </label>

      {isDropdownOpen && suggestions.length > 0 && (
        <div className={styles.dropdown}>
          <ul className={styles.suggestions_list}>
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                className={`${styles.suggestion_item} ${
                  index === selectedIndex ? styles.suggestion_item_selected : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className={styles.suggestion_icon}>
                  {getCategoryIcon(suggestion.categoryType)}
                </span>
                <div className={styles.suggestion_content}>
                  <span className={styles.suggestion_title}>
                    {suggestion.title}
                  </span>
                  <span className={styles.suggestion_type}>
                    {suggestion.type === 'category' ? 'Категория' : 'Навык'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
