import { useState, type FC } from 'react';
import { CheckboxUI } from '../checkboxUI';
import styles from './checkbox-group.module.css';
import type { TSkillSubFilter } from '@/shared/global-types';
import { AllFiltersButtonUI } from '../all-filters-buttonUI';

export type TCityFilter = {
  id: string;
  title: string;
  type: string;
  status: boolean;
};

type CheckboxGroupUIProps = {
  title?: string;
  filters: TCityFilter[] | TSkillSubFilter[];
  onSelect: (id: string) => void; // Теперь передаем только ID измененного элемента
};

const VISIBLE_CITIES_COUNT = 5;

export const CheckboxGroupUI: FC<CheckboxGroupUIProps> = ({ title, filters, onSelect }) => {
  // Полностью убрали локальное состояние
  // Работаем напрямую с переданными фильтрами из стора

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFilters = isExpanded ? filters : filters.slice(0, VISIBLE_CITIES_COUNT);

  const handleCheckboxChange = (id: string) => {
    // Просто передаем ID измененного элемента
    onSelect(id);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.checkbox_list}>
        {visibleFilters.map((filter) => (
          <CheckboxUI
            key={filter.id}
            label={filter.title}
            value={filter.id}
            checked={filter.status}
            onChange={() => handleCheckboxChange(filter.id)}
          />
        ))}
        <AllFiltersButtonUI title='Все города' onClick={toggleExpanded} isExpanded={isExpanded} />
      </div>
    </div>
  );
};
