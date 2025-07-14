import { CrossSVG, SearchSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';
import styles from './search-field.module.css';
import type { SearchFieldUIProps } from './type';
import React, { useState } from 'react';

export const SearchFieldUI = ({ onReset }: SearchFieldUIProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
    onReset?.();
  };

  return (
    <label className={styles.input_wrapper}>
      <span className={styles.search_icon}>
        <SearchSVG color='var(--caption-redesigned)' />
      </span>
      <input
        className={styles.input}
        type='text'
        placeholder='Искать навык'
        value={value}
        onChange={handleChange}
      />
      {value && (
        <ButtonUI type='button' onClick={handleReset} className={styles.clear_button}>
          <CrossSVG />
        </ButtonUI>
      )}
    </label>
  );
};
