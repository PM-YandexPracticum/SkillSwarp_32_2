import type { FC } from 'react';
import type { FilterBlockProps } from './type';
import { ButtonUI, CheckBoxDropDownGroupUI, RadioButtonGroupUI } from '@/shared/ui';
import { CheckboxGroupUI } from '@/shared/ui/checkbox-group/checkbox-group';
import styles from './filter-block.module.css';
import { CrossSVG } from '@/assets/svg';
import { useDispatch } from '@/services/store';
import { resetAllFilters } from '@/services/slices';

export const FilterBlock: FC<FilterBlockProps> = ({
  educationFilters,
  cityFilters,
  skillFilters,
  genderFilters,
  onEducationChange,
  onGenderChange,
  onSkillChange,
  onCityChange,
  activeFiltersCount,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {activeFiltersCount ? (
        <div className={styles.title_container}>
          <h2 className={styles.title}>{`Фильтры (${activeFiltersCount})`}</h2>
          <ButtonUI
            type='button'
            onClick={() => dispatch(resetAllFilters())}
            className={styles.button_reset}
          >
            <span>Сбросить</span>
            <CrossSVG color='var(--interaction-color)' />
          </ButtonUI>
        </div>
      ) : (
        <h2 className={styles.title}>Фильтры</h2>
      )}
      <div className={styles.groups_container}>
        <RadioButtonGroupUI filters={educationFilters} onChangeAction={onEducationChange} />
        <CheckBoxDropDownGroupUI filters={skillFilters} onChange={onSkillChange} title='Навыки' />
        <RadioButtonGroupUI
          filters={genderFilters}
          onChangeAction={onGenderChange}
          title='Пол автора'
        />
        <CheckboxGroupUI filters={cityFilters} onSelect={onCityChange} title='Город' />
      </div>
    </div>
  );
};
