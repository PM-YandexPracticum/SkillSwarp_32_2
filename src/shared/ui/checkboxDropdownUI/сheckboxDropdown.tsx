import { useCallback } from 'react';
import styles from './checkboxDropdown.module.css';
import { CheckboxUI } from '../checkboxUI';
import type { CheckboxDropdownUIProps } from './type';
import { ButtonUI } from '../buttonUI';
import { ChevronDownSVG } from '@/assets/svg';
import type { TSkillSubFilter } from '@/shared/global-types';

export const CheckboxDropdownUI = (props: CheckboxDropdownUIProps) => {
  const { 
    label, 
    options, 
    selectedOptions = [],
    onSelect,
    onToggle,
    isOpen
  } = props;

  const toggleSelectAll = useCallback(() => {
    const allChecked = options.every(opt => 
      selectedOptions.some(sel => sel.id === opt.id && sel.status)
    );
    
    const updatedOptions = options.map(opt => ({
      ...opt,
      status: !allChecked
    }));
    
    onSelect(updatedOptions);
  }, [options, selectedOptions, onSelect]);

  const handleCheckboxChange = useCallback((option: TSkillSubFilter) => {
    const updatedOptions = options.map(opt => 
      opt.id === option.id 
        ? { ...opt, status: !selectedOptions.some(sel => sel.id === opt.id && sel.status) }
        : opt
    );
    onSelect(updatedOptions);
  }, [options, selectedOptions, onSelect]);

  const checkedCount = selectedOptions.filter(opt => opt.status).length;
  const isAllChecked = options.length > 0 && checkedCount === options.length;
  const isPartialChecked = checkedCount > 0 && !isAllChecked;
  const ariaChecked = isAllChecked ? 'true' : isPartialChecked ? 'mixed' : 'false';

  return (
    <div className={styles.dropdown} data-is-active={isOpen}>
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
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            <ChevronDownSVG />
          </ButtonUI>
        </CheckboxUI>
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <CheckboxUI
              key={option.id}
              label={option.title}
              value={option.id}
              checked={selectedOptions.some(sel => sel.id === option.id && sel.status)}
              onChange={() => handleCheckboxChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
