import { useState, type FC } from 'react';
import { CheckboxDropdownUI } from '@/shared/ui/checkboxDropdownUI';
import styles from './checkbox-dropdown-group.module.css';
import type { TSkillSubFilter } from '@/shared/global-types';
import type { CheckBoxDropDownGroupProps } from './type';

export const CheckBoxDropDownGroupUI: FC<CheckBoxDropDownGroupProps> = ({ 
  filters, 
  onChange, 
  title 
}) => {
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);

  const handleSelect = (mainFilterId: string, updatedSubFilters: TSkillSubFilter[]) => {
    const updatedFilters = filters.map(mainFilter => 
      mainFilter.id === mainFilterId
        ? { ...mainFilter, subFilters: updatedSubFilters }
        : mainFilter
    );
    onChange(updatedFilters);
  };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.checkbox_dropdown_list}>
        {filters.map((filter) => (
          <CheckboxDropdownUI
            key={filter.id}
            label={filter.title}
            options={filter.subFilters}
            selectedOptions={filter.subFilters}
            onSelect={(selected) => handleSelect(filter.id, selected)}
            isOpen={openedDropdown === filter.id}
            onToggle={() => setOpenedDropdown(
              openedDropdown === filter.id ? null : filter.id
            )}
          />
        ))}
      </div>
    </div>
  );
};
