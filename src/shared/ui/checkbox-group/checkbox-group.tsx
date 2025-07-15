import { useEffect, useState, type FC } from 'react';
import { CheckboxUI } from '../checkboxUI';
import styles from './checkbox-group.module.css';
import type { TCityFilter, TSkillSubFilter } from '@/shared/global-types';

type CheckboxUIGroupProps = {
  title?: string;
  filters: TSkillSubFilter[] | TCityFilter[];
  selectedOptions?: TSkillSubFilter[] | TCityFilter[];
  onSelect: (selected: TSkillSubFilter[] | TCityFilter[]) => void;
};

export const CheckboxGroupUI: FC<CheckboxUIGroupProps> = ({
  filters,
  onSelect,
  title,
  selectedOptions = [],
}) => {
  const [allOptions, setAllOptions] = useState<TSkillSubFilter[]>(() => {
    return filters.map((filter) => {
      const selected = selectedOptions.find((o) => o.id === filter.id);
      return selected ? { ...filter, status: selected.status } : filter;
    });
  });

  const handleCheckboxChange = (option: TSkillSubFilter) => {
    setAllOptions((prev) =>
      prev.map((item) => (item.id === option.id ? { ...item, status: !item.status } : item))
    );
  };

  // Передаем все опции при каждом изменении
  useEffect(() => {
    onSelect(allOptions);
  }, [allOptions, onSelect]);

  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}
      <div className={styles.checkbox_list}>
        {allOptions.map((option) => (
          <CheckboxUI
            key={option.id}
            label={option.title}
            value={option.id}
            checked={option.status}
            onChange={() => handleCheckboxChange(option)}
          />
        ))}
      </div>
    </div>
  );
};
