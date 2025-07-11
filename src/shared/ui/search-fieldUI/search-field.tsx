import { CrossSVG, SearchSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';
import styles from './search-field.module.css';
import type { SearchFieldUIProps } from './type';
export const SearchFieldUI = ({ onReset }: SearchFieldUIProps) => {
  return (
    <label className={styles.input_wrapper}>
      <span className={styles.search_icon}>
        <SearchSVG color='var(--caption-redesigned)' />
      </span>
      <input className={styles.input} type='text' placeholder='Искать навык' />

      {/* Крестик должен будет появляться, когда в поле есть текст, пока что он тут постоянно */}

      <ButtonUI type='button' onClick={onReset} className={styles.clear_button}>
        <CrossSVG />
      </ButtonUI>
    </label>
  );
};
