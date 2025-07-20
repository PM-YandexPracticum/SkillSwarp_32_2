import { ChevronDownSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';
import type { AllFiltersButtonProps } from './type';
import styles from './all-filters-button.module.css';

export const AllFiltersButtonUI = ({ title, onClick, isExpanded }: AllFiltersButtonProps) => {
  return (
    <ButtonUI
      type='button'
      onClick={onClick}
      className={styles.button}
      data-is-expanded={isExpanded}
    >
      <span>{!isExpanded ? title : 'Скрыть'}</span>
      <span className={styles.chevron}>
        <ChevronDownSVG />
      </span>
    </ButtonUI>
  );
};
