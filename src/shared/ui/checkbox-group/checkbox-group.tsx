import { useState, type FC } from 'react';
import { CheckboxUI } from '../checkboxUI';
import type { TSubFilter } from '../checkboxDropdownUI/type';
import styles from './checkbox-group.module.css';

type CheckboxUIGroupProps = {
  title?: string;
  filters: TSubFilter[];
  selectedOptions: TSubFilter[];
  onSelect: (selected: TSubFilter[]) => void;
};

export const CheckboxGroupUI: FC<CheckboxUIGroupProps> = ({
  filters,
  selectedOptions,
  onSelect,
  title,
}) => {
  const [localSelected, setLocalSelected] = useState(selectedOptions);

  const handleCheckboxChange = (option: TSubFilter) => {
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((o) => o !== option)
      : [...localSelected, option];
    setLocalSelected(newSelected);
    onSelect(newSelected);
  };

  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}
      <div>
        {filters.map((filter) => (
          <CheckboxUI
          key={filter.id}
            label={filter.title}
            value={filter.title}
            checked={localSelected.includes(filter)}
            onChange={() => handleCheckboxChange(filter)}
          />
        ))}
      </div>
    </div>
  );
};
