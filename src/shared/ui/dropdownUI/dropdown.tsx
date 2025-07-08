import React, { useEffect, useRef, useState } from 'react';
import type { DropdownUIProps } from './type';
import styles from './dropdown.module.css';
import { InputUI } from '../inputUI';
import { ArrowDown, ArrowUp } from './dropdownIcons';

export const DropdownUI = ({
    value, 
    withFilter, 
    isMultiSelect, 
    placeholder, 
    children
  }: DropdownUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openToggleHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(prevState => !prevState);
  };

  const closeHandler = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Закрываем по клику вне дропдауна
  useEffect(() => {
    if (isOpen) window.addEventListener('click', closeHandler);
    
    return () => window.removeEventListener('click', closeHandler);
  }, [isOpen]);

  useEffect(() => {
    if (withFilter) {
      setFilter('');
      setIsOpen(false);
    }
  }, [value, withFilter]);

  // Является ли значение массивом (несколько чекбоксов)
  const valueIsArray = Array.isArray(value);

  return (
    // Если withFilter = true, добавляем инпут для поиска
    <div className={styles.dropdown} ref={dropdownRef}>
      {withFilter && !valueIsArray ? (
        <div>
          {isOpen ? (<InputUI 
            type='text'  
            value={filter} 
            name='filter' 
            onChange={e => setFilter(e.target.value)}
            placeholder={placeholder}
          />) :
          (<span onMouseDown={() => setIsOpen(true)} className={styles.title}>{value.name || placeholder}</span>)
          }
        </div>)
      : 
          // Варианты без фильтра
          // Проверка, если мултивыбор и выбрано несколько опций (чекбокс)
          // Показываем количество выбранных, либо плейсхолдер
          // Если не мультивыбор, отображаем имя опции
          <div className={styles.title} onClick={openToggleHandler}>
            {valueIsArray && !value.length && placeholder}
            {!valueIsArray && !value.name && placeholder}
            {isMultiSelect && valueIsArray && value.length > 0 ? `Выбрано: ${value.length}` : null}
            {!isMultiSelect && !valueIsArray && value.name ? value.name : null}
          </div>
      }
      {isOpen && (
          <ul className={styles.list}>
            {children({filter})}
          </ul>
      )}
      {<div className={styles.icon}>
        <button className={styles['icon-button']} onClick={openToggleHandler}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </button>
      </div>}
    </div>
  );
};
