import { useState, type FC } from 'react';
import { CheckboxUI } from '../checkboxUI';
import styles from './checkbox-group.module.css';
import type { TSkillSubFilter } from '@/shared/global-types';


type CheckboxUIGroupProps = {
  title?: string;
  filters: TSkillSubFilter[];
  selectedOptions?: TSkillSubFilter[];
  onSelect: (selected: TSkillSubFilter[]) => void;
};

export const CheckboxGroupUI: FC<CheckboxUIGroupProps> = ({
  filters,
  onSelect,
  title,
}) => {


  const [localSelected, setLocalSelected] = useState(filters);


  const handleCheckboxChange = (option: TSkillSubFilter) => {

    option.status = !option.status;
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((o) => o.status === true )
      : [...localSelected, option];

    let updatedLocalSelected = newSelected.filter((o) => o.status !== false);
    // if (option.status) updatedLocalSelected.push(option)
    
    setLocalSelected(newSelected);
    onSelect(updatedLocalSelected);
  };

  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}
      <div className={styles.checkbox_list}>
        {filters.map((filter) => (
          <CheckboxUI
          key={filter.id}
            label={filter.title}
            value={filter.id}
            checked={filter.status}
            onChange={() => handleCheckboxChange(filter)}
          />
        ))}
      </div>
    </div>
  );
};
