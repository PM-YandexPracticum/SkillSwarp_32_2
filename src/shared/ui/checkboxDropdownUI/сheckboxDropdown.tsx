import { useRef, useState, useEffect } from 'react';
import styles from './checkboxDropdown.module.css';
import { CheckboxUI } from '../checkboxUI';
import type { CheckboxDropdownUIProps } from './type';
import { ButtonUI } from '../buttonUI';
import { ChevronDownSVG } from '@/assets/svg';
import type { TSkillSubFilter } from '@/shared/global-types';

interface DropdownState {
  [label: string]: boolean;
}

export const CheckboxDropdownUI = (props: CheckboxDropdownUIProps) => {
  const { label, options, onSelect, selectedOptions = [] } = props;
  const [isOpen, setIsOpen] = useState<DropdownState>({});
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [localOptions, setLocalOptions] = useState<TSkillSubFilter[]>(() => {
    // Инициализируем состояние, объединяя props.options и selectedOptions
    return options.map(option => {
      const selected = selectedOptions.find(o => o.id === option.id);
      return selected ? { ...option, status: selected.status } : option;
    });
  });

  // Синхронизируем с внешними изменениями options
  useEffect(() => {
    setLocalOptions(prev => 
      options.map(option => {
        const existing = prev.find(o => o.id === option.id);
        return existing || option;
      })
    );
  }, [options]);

  const toggleSelectAll = () => {
    const allChecked = localOptions.every(option => option.status);
    const updatedOptions = localOptions.map(option => ({
      ...option,
      status: !allChecked
    }));
    
    setLocalOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleCheckboxChange = (option: TSkillSubFilter) => {
    const updatedOptions = localOptions.map(item => 
      item.id === option.id 
        ? { ...item, status: !item.status } 
        : item
    );
    
    setLocalOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const handleDropdownToggle = () => {
    setIsOpen(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const checkedCount = localOptions.filter(option => option.status).length;
  const isAllChecked = localOptions.every(option => option.status);
  const isPartialChecked = checkedCount > 0 && !isAllChecked;
  const ariaChecked = isAllChecked ? 'true' : isPartialChecked ? 'mixed' : 'false';

  return (
    <div className={styles.dropdown} ref={rootRef} data-is-active={isOpen[label]}>
      <div className={styles.dropdownTitle}>
        <CheckboxUI
          key={label}
          label={label}
          value='all'
          checked={isAllChecked}
          ariaChecked={ariaChecked}
          onChange={toggleSelectAll}
        >
          <ButtonUI 
            className={styles.chevron} 
            type='button' 
            onClick={handleDropdownToggle}
            aria-expanded={isOpen[label]}
          >
            <ChevronDownSVG />
          </ButtonUI>
        </CheckboxUI>
      </div>

      {isOpen[label] && (
        <div className={styles.dropdownContent}>
          {localOptions.map((option) => (
            <CheckboxUI
              key={option.id}
              label={option.title}
              value={option.id}
              checked={option.status}
              onChange={() => handleCheckboxChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};