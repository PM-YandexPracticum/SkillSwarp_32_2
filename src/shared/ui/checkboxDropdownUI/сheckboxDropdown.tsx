import { useRef, useState } from 'react';
import styles from './checkboxDropdown.module.css';
import { CheckboxUI } from '../checkboxUI';
import type { CheckboxDropdownUIProps } from './type';
// import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { ButtonUI } from '../buttonUI';
import { ChevronDownSVG } from '@/assets/svg';
import type { TSkillSubFilter } from '@/shared/global-types';

interface DropdownState {
  [label: string]: boolean;
}

export const CheckboxDropdownUI = (props: CheckboxDropdownUIProps) => {
  const { label, options, selectedOptions, onSelect } = props;
  const [isOpen, setIsOpen] = useState<DropdownState>({});
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [localSelected, setLocalSelected] = useState(selectedOptions);

  // useOutsideClickClose({
  //   isOpen,
  //   rootRef,
  //   onClose,
  //   onChange: setIsOpen,
  // });

  const toggleSelectAll = () => {
    if (isAllChecked) {
      setLocalSelected([]);
      onSelect([]);
    } else {
      setLocalSelected(options);
      onSelect(options);
    }
  };

  const handleCheckboxChange = (option: TSkillSubFilter) => {
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((o) => o !== option)
      : [...localSelected, option];
    setLocalSelected(newSelected);
    onSelect(newSelected);
  };

  const handleDropdownToggle = () => {
    setIsOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isAllChecked = options.every((option) => localSelected.includes(option));
  const isPartialChecked = localSelected.length > 0 && !isAllChecked;
  const ariaChecked = isAllChecked ? 'true' : isPartialChecked ? 'mixed' : 'false';

  return (
    <div className={styles.dropdown} ref={rootRef} data-is-active={isOpen}>
      <div className={styles.dropdownTitle}>
        <CheckboxUI
        key={label}
          label={label}
          value='all'
          checked={isAllChecked}
          ariaChecked={ariaChecked}
          onChange={toggleSelectAll}
        >
          <ButtonUI className={styles.chevron} type='button' onClick={handleDropdownToggle}>
            <ChevronDownSVG />
          </ButtonUI>
        </CheckboxUI>
      </div>

{/* Здесь можно заменить на CheckboxGroupUI */}
      {isOpen[label] && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <CheckboxUI
            key={option.id}
              label={option.title}
              value={option.title}
              checked={option.status}
              onChange={() => handleCheckboxChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
