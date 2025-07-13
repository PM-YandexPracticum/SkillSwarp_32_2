import { CheckboxDropdownUI } from '@/shared/ui/checkboxDropdownUI';
import { useEffect, useState, type FC } from 'react';
import styles from './checkbox-dropdown-group.module.css';
import type { CheckBoxGroupProps, filterType, TSubFilter } from './type';

export const CheckBoxDropDownGroupUI: FC<CheckBoxGroupProps> = ({ filters, onChange, title }) => {
  const [selectedValues, setSelectedValues] = useState<TSubFilter[]>([]);

  const handleSelect = (mainFilter: filterType, newSelections: TSubFilter[]) => {
    setSelectedValues((prev) => {
      // Удаляем все значения данного типа
      const filtered = prev.filter(
        (item) => !filters.find((f) => f.type === mainFilter)?.subFilters.includes(item)
      );
      // Добавляем новые выбранные значения
      return [...filtered, ...newSelections];
    });
  };

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues, onChange]);

  return (
    <div className={styles.container}>
      <h3> {title} </h3>
      <div>
      {filters.map((filter) => (
        <CheckboxDropdownUI
        key={filter.id}
          label={filter.title}
          options={filter.subFilters}
          selectedOptions={selectedValues.filter((opt) =>
            filter.subFilters.some((sub) => sub.id === opt.id)
          )}
          onSelect={(selected) => handleSelect(filter.type, selected)}
        />
      ))}
      </div>
    </div>
  );
};
