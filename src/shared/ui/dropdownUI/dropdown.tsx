import { useState } from 'react';
import styles from './dropdown.module.css';
import type { DropdownOption, DropdownUIProps } from './type';
import { InputUI } from '../inputUI';

export const DropdownUI = ({
    value, 
    withFilter, 
    isMultiSelect, 
    placeholder, 
    children
  }: DropdownUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const isArray = Array.isArray(value);

  const openToggleHandler = () => setIsOpen(prevState => !prevState);
  const closeHandler = () => setIsOpen(false);

  return (
    <div className={styles.dropdown}>
      {withFilter ? (
        <div onClick={openToggleHandler}>
          <InputUI 
            type='text' 
            value={filter} 
            name='filter' 
            onChange={e => setFilter(e.target.value)}
          />
        </div>)
      : 
          <div className={styles.title} onClick={openToggleHandler}>
            {isMultiSelect && isArray ? `Выбрано: ${value.length}` : placeholder}
            {!isMultiSelect && !isArray && value.name}
          </div>
      }
      {isOpen && (
          <ul className={styles.list}>
            {children({filter})}
          </ul>
        
      )}
    </div>
  );
};
