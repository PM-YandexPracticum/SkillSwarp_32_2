import type { FC } from 'react';
import type { FilterBlockProps } from './type';
import { CheckBoxDropDownGroupUI, RadioButtonGroupUI } from '@/shared/ui';
import { CheckboxGroupUI } from '@/shared/ui/checkbox-group/checkbox-group';
import styles from './filter-block.module.css';

export const FilterBlock: FC<FilterBlockProps> = ({
  educationFilters,
  cityFilters,
  skillFilters,
  genderFilters,
  onEducationChange,
  onGenderChange,
  onSkillChange,
  onCityChange,
}) => {

  return (
    <div className={styles.container}>
      <h2>Фильтры</h2>
      <RadioButtonGroupUI filters={educationFilters} onChangeAction={onEducationChange}/>
      <CheckBoxDropDownGroupUI filters={skillFilters} onChange={onSkillChange}  title='Навыки'/>
      <RadioButtonGroupUI filters={genderFilters} onChangeAction={onGenderChange} title='Пол автора'/>
      <CheckboxGroupUI filters={cityFilters} onSelect={onCityChange} title= 'Город'/>
    </div>
  );
};
