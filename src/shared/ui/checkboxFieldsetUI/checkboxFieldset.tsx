import React, { useState, useRef } from 'react';
import type { CheckboxListProps } from './type';
import { CheckboxUI } from '../checkboxUI';
import { CheckboxDropdownUI } from '../checkboxDropdownUI';
// import { CheckboxUI, CheckboxDropdownUI} from './checkboxComponents'; // предполагаемый путь импорта

export const CheckboxList = ({
  title,
  listType,
  items,
  selectedItems = [],
  onSelect = () => {},
  buttonLabel = 'Показать поиск',
  onButtonClick = () => {},
}: CheckboxListProps) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = searchValue
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : items;

  const handleButtonClick = () => {
    setIsSearchVisible(!isSearchVisible);
    onButtonClick();
  };

  return (
    <div className="checkbox-list-container">
      <h3 className="list-title">{title}</h3>

      {isSearchVisible && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      )}

      <div
        ref={listRef}
        className={`list-content ${isSearchVisible ? 'scrollable' : ''}`}
      >
        {listType === 'checkbox' ? (
          items.map((item) => (
            <CheckboxUI
              key={item.id}
              label={item.title}
              value={item.id}
              checked={selectedItems.includes(item.id)}
              onChange={(value) => onSelect([value])}
            />
          ))
        ) : (
          <CheckboxDropdownUI
            label={title}
            options={filteredItems}
            selectedOptions={selectedItems}
            onSelect={onSelect}
          />
        )}
      </div>

      <button
        className="toggle-button"
        onClick={handleButtonClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
};