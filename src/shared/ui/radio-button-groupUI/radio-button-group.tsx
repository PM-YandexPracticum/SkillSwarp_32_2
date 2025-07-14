import { useState, type FC } from 'react';
import type { RadioButtonGroupProps } from './type';
import styles from './radio-button-group.module.css';
import { RadioButtonUI } from '@/shared/ui';

export const RadioButtonGroupUI: FC<RadioButtonGroupProps> = ({ title, filters, onChangeAction }) => {
  const [radioState, setRadioState] = useState(filters);

  const handleChange = (selectedValue: string) => {
    const updatedState = radioState.map((filter) => ({
      ...filter,
      status: filter.value === selectedValue,
    }));
    setRadioState(updatedState);

    //Передаем наружу значения фильтра
    onChangeAction(updatedState);
  };

  return (
    <div className={styles.radio_button_group}>
      {title && <h3>{title}</h3>}
      <div className={styles.buttons_list}>
        {radioState.map((filter, index) => (
          <RadioButtonUI
            key={index}
            checked={filter.status}
            value={filter.value}
            onChange={handleChange}
            label={filter.title}
          />
        ))}
      </div>
    </div>
  );
};
