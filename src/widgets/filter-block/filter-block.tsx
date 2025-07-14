import type { FC } from 'react';
import type { FilterBlockProps } from './type';
import { CheckBoxDropDownGroupUI, RadioButtonGroupUI } from '@/shared/ui';
import { mainFilters } from './mockData';
import { CheckboxGroupUI } from '@/shared/ui/checkbox-group/checkbox-group';
import styles from './filter-block.module.css';
import type { commonFilterType, TSkillSubFilter } from '@/shared/global-types';

export const FilterBlock: FC<FilterBlockProps> = ({
  onEducationChange,
  onGenderChange,
  onSkillChange,
  onCityChange,
}) => {

  const educationFilters: commonFilterType[] = [
    {
      title: 'Всё',
      value: null,
      status: true,
    },
    {
      title: 'Хочу научиться',
      value: 'learn',
      status: false,
    },
    {
      title: 'Могу научить',
      value: 'teach',
      status: false,
    },
  ];
  const genderFilters: commonFilterType[] = [
    {
      title: 'Не имеет значения',
      value: null,
      status: true,
    },
    {
      title: 'Мужской',
      value: 'male',
      status: false,
    },
    {
      title: 'Женской',
      value: 'female',
      status: false,
    },
  ];

const cityFilters: TSkillSubFilter[] = [
  {
    title: 'Москва',
    id: 'city-1',
    type: 'city',
    status: false
  },
  {
    title: 'Санкт-Петербург',
    id: 'city-2',
    type: 'city',
    status: false
  },
  {
    title: 'Новосибирск',
    id: 'city-3',
    type: 'city',
    status: false
  },
  {
    title: 'Екатеринбург',
    id: 'city-4',
    type: 'city',
    status: false
  },
  {
    title: 'Казань',
    id: 'city-5',
    type: 'city',
    status: false
  },
  {
    title: 'Нижний Новгород',
    id: 'city-6',
    type: 'city',
    status: false
  },
  {
    title: 'Челябинск',
    id: 'city-7',
    type: 'city',
    status: false
  },
  {
    title: 'Самара',
    id: 'city-8',
    type: 'city',
    status: false
  },
  {
    title: 'Омск',
    id: 'city-9',
    type: 'city',
    status: false
  },
  {
    title: 'Ростов-на-Дону',
    id: 'city-10',
    type: 'city',
    status: false
  }
];

  return (
    <div className={styles.container}>
      <h2>Фильтры</h2>
      <RadioButtonGroupUI filters={educationFilters} onChangeAction={onEducationChange}/>
      <CheckBoxDropDownGroupUI filters={mainFilters} onChange={onSkillChange}  title='Навыки'/>
      <RadioButtonGroupUI filters={genderFilters} onChangeAction={onGenderChange} title='Пол автора'/>
      <CheckboxGroupUI filters={cityFilters} selectedOptions={[]} onSelect={onCityChange} title= 'Город'/>
    </div>
  );
};
