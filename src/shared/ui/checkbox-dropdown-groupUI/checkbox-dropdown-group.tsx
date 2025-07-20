import { useState, type FC } from 'react';
import { CheckboxDropdownUI } from '@/shared/ui/checkboxDropdownUI';
import styles from './checkbox-dropdown-group.module.css';
import type { TSkillSubFilter } from '@/shared/global-types';
import type { CheckBoxDropDownGroupProps } from './type';
import { AllFiltersButtonUI } from '../all-filters-buttonUI';

const VISIBLE_CATEGORIES_COUNT = 4;

export const CheckBoxDropDownGroupUI: FC<CheckBoxDropDownGroupProps> = ({
  filters,
  onChange,
  title,
}) => {
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleFilters = isExpanded ? filters : filters.slice(0, VISIBLE_CATEGORIES_COUNT);

  const handleSelect = (mainFilterId: string, updatedSubFilters: TSkillSubFilter[]) => {
    const updatedFilters = filters.map((mainFilter) =>
      mainFilter.id === mainFilterId ? { ...mainFilter, subFilters: updatedSubFilters } : mainFilter
    );
    onChange(updatedFilters);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.checkbox_dropdown_list}>
        {visibleFilters.map((filter) => (
          <CheckboxDropdownUI
            key={filter.id}
            label={filter.title}
            options={filter.subFilters}
            selectedOptions={filter.subFilters}
            onSelect={(selected) => handleSelect(filter.id, selected)}
            isOpen={openedDropdown === filter.id}
            onToggle={() => setOpenedDropdown(openedDropdown === filter.id ? null : filter.id)}
          />
        ))}
        <AllFiltersButtonUI
          title='Все категории'
          onClick={toggleExpanded}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};
