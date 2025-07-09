import { useRef, useState, type MouseEventHandler } from 'react';
import styles from './checkboxDropdown.module.css';
import { CheckboxUI } from '../checkboxUI';
import type { CheckboxDropdownUIProps } from './type';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import chevronDown from '../../../assets/svg/chevron-down.svg';

export const CheckboxDropdownUI = (props: CheckboxDropdownUIProps) => {
  const { label, options, selectedOptions, onSelect, onClose } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [localSelected, setLocalSelected] = useState(selectedOptions);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onClose,
    onChange: setIsOpen,
  });

  const toogleSelectAll = () => {
    if (isAllChecked) {
      setLocalSelected([]);
      onSelect([]);
    } else {
      setLocalSelected(options);
      onSelect(options);
    }
  };

  const handleCheckboxChange = (option: string) => {
    const newSelected = localSelected.includes(option)
      ? localSelected.filter((o) => o !== option)
      : [...localSelected, option];
    setLocalSelected(newSelected);
    onSelect(newSelected);
  };

  const handleDropdownToggle: MouseEventHandler<HTMLSpanElement> = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const isAllChecked = options.every((option) => localSelected.includes(option));
  const isPartialChecked = localSelected.length > 0 && !isAllChecked;
  const ariaChecked = isAllChecked ? 'true' : isPartialChecked ? 'mixed' : 'false';

  return (
    <div className={styles.dropdown} ref={rootRef} data-is-active={isOpen}>
      <div className={styles.dropdownTitle}>
        <CheckboxUI
          label={label}
          value='all'
          checked={isAllChecked}
          ariaChecked={ariaChecked}
          onChange={toogleSelectAll}
        />
        <img
          src={chevronDown}
          alt='иконка стрелочки'
          className={styles.chevron}
          role='button'
          onClick={handleDropdownToggle}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options.map((option) => (
            <CheckboxUI
              key={option}
              label={option}
              value={option}
              checked={localSelected.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
