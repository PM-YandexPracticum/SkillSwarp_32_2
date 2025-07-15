import { CheckboxDropdownUI } from '@/shared/ui/checkboxDropdownUI';
import { useEffect, useState, type FC, useMemo } from 'react';
import styles from './checkbox-dropdown-group.module.css';
import type { parentSkillFilterType, TSkillSubFilter } from '@/shared/global-types';
import type { CheckBoxDropDownGroupProps } from './type';

export const CheckBoxDropDownGroupUI: FC<CheckBoxDropDownGroupProps> = ({ filters, onChange, title }) => {
  // Собираем все подфильтры в один массив с мемоизацией
  const allSubFilters = useMemo(() => {
    return filters.flatMap(filter => filter.subFilters);
  }, [filters]);

  // Инициализируем состояние только активными подфильтрами
  const [selectedValues, setSelectedValues] = useState<TSkillSubFilter[]>(() => {
    return allSubFilters.filter(sub => sub.status);
  });

  const handleSelect = (mainFilter: parentSkillFilterType, newSelections: TSkillSubFilter[]) => {
    setSelectedValues(prev => {
      // Находим все подфильтры для данного mainFilter
      const mainFilterSubs = filters.find(f => f.type === mainFilter)?.subFilters || [];
      
      // Фильтруем предыдущие значения, удаляя подфильтры текущего mainFilter
      const filteredPrev = prev.filter(
        item => !mainFilterSubs.some(sub => sub.id === item.id)
      );
      
      // Добавляем новые выбранные значения (только с status: true)
      const newSelected = newSelections.filter(sub => sub.status);
      
      return [...filteredPrev, ...newSelected];
    });
  };

  // Обновляем все подфильтры при изменении selectedValues
  useEffect(() => {
    const updatedAllSubs = allSubFilters.map(sub => {
      const selected = selectedValues.find(s => s.id === sub.id);
      return selected ? { ...sub, status: selected.status } : sub;
    });
    
    onChange(updatedAllSubs);
  }, [selectedValues, onChange, allSubFilters]);

  return (
    <div className={styles.container}>
      {title && <h3>{title}</h3>}
      <div className={styles.checkbox_dropdown_list}>
        {filters.map((filter) => (
          <CheckboxDropdownUI
            key={filter.id}
            label={filter.title}
            options={filter.subFilters}
            selectedOptions={selectedValues.filter(opt =>
              filter.subFilters.some(sub => sub.id === opt.id)
            )}
            onSelect={(selected) => handleSelect(filter.type, selected)}
          />
        ))}
      </div>
    </div>
  );
};