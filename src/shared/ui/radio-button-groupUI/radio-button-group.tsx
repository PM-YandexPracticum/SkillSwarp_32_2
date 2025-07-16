import { useCallback, type FC } from 'react';
import type { RadioButtonGroupProps } from './type';
import styles from './radio-button-group.module.css';
import { RadioButtonUI } from '@/shared/ui';

export const RadioButtonGroupUI: FC<RadioButtonGroupProps> = ({
  title,
  filters,
  onChangeAction,
}) => {
  const handleChange = useCallback((selectedValue: string | null) => {
    const updatedState = filters.map((filter) => ({
      ...filter,
      status: filter.value === selectedValue,
    }));
    onChangeAction(updatedState);
  }, [filters, onChangeAction]);

  return (
    <div className={styles.radio_button_group}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.buttons_list}>
        {filters.map((filter, index) => (
          <RadioButtonUI
            key={index}
            checked={filter.status}
            value={filter.value}
            onChange={() => handleChange(filter.value)}
            label={filter.title}
          />
        ))}
      </div>
    </div>
  );
};
