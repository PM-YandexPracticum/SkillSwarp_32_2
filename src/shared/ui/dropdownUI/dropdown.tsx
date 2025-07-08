import React, { useEffect, useRef, useState } from 'react';
import type { DropdownUIProps } from './type';
import styles from './dropdown.module.css';
import { InputUI } from '../inputUI';
import { ArrowDown, ArrowUp } from './dropdownIcons';

// value = выбранная опция или список опций
// withFilter = текстовый фильтра
// isMultiSelect = чекбоксы
// placeholder = что будет вместо титла по-умолчанию
// children = рендер-проп. Родительский компонент будет передавать эту функцию
//            в DropdownUI. Функция получает актуальное значение filter, для
//            фильтрации списка опций родителем. Функция должна возвращать ReactNode,
//            который отрендеритсят внутри дропдауна. 
export const DropdownUI = ({
    value, 
    withFilter, 
    isMultiSelect, 
    placeholder, 
    children,
  }: DropdownUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // При выборе опции с фильтром очищаем фильтр закрываем
  // При чекбоксах остается и фильтр, и список
  useEffect(() => {
    if (withFilter && !isMultiSelect) {
      setFilter('');
      setIsOpen(false);
    }
  }, [isMultiSelect, value, withFilter]);

  // Автофокус на инпут при нажатии на дропдаун
  useEffect(() => {
    if (isOpen && withFilter) setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen, withFilter]);

  // Является ли значение массивом (несколько чекбоксов)
  const valueIsArray = Array.isArray(value);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles['title-wrapper']}>     
        <button className={styles['icon-button']} onClick={openToggleHandler}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </button>
        {withFilter ? (
          isOpen ? (
            <InputUI
              type='text'
              value={filter}
              name='filter'
              onChange={(e) => setFilter(e.target.value)}
              placeholder={placeholder}
              ref={inputRef}
            />
          ) : (
            <span onMouseDown={() => setIsOpen(true)} className={styles.title}>
              {valueIsArray ? 
                `Выбрано: ${value.length}`
               : 
                value.name || placeholder
              }
            </span>
          )
        ) : (
          <div className={styles.title} onClick={openToggleHandler}>
            {valueIsArray && !value.length && placeholder}
            {!valueIsArray && !value.name && placeholder}
            {isMultiSelect && valueIsArray && value.length > 0
              ? `Выбрано: ${value.length}`
              : null}
            {!isMultiSelect && !valueIsArray && value.name ? value.name : null}
          </div>
        )}
      </div>

      {isOpen && (
        <ul className={styles.list} onClick={(event) => event.stopPropagation()}>
          {children({ filter })}
        </ul>
      )}
    </div>
  );
};
