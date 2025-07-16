import { ButtonUI } from '@/shared/ui';
import styles from './enabled-filters-block.module.css';
import { CrossSVG } from '@/assets/svg';
import type { EnabledFiltersBlockProps } from './type';
import { useDispatch } from '@/services/store';
import {
  removeCitiesFilter,
  removeEducationFilter,
  removeGenderFilter,
  removeSkillsFilter,
} from '@/services/slices';

export const EnabledFiltersBlock = ({ filters }: EnabledFiltersBlockProps) => {
  const dispatch = useDispatch();

  const handleRemove = (filter: { id: string; type: string }) => {
    switch (filter.type) {
      case 'education':
        dispatch(removeEducationFilter());
        break;
      case 'gender':
        dispatch(removeGenderFilter());
        break;
      case 'skill':
        dispatch(removeSkillsFilter(filter.id));
        break;
      case 'city':
        dispatch(removeCitiesFilter(filter.id));
        break;
    }
  };

  return (
    <div className={styles.buttons}>
      {filters.map((filter) => {
        return (
          <ButtonUI
            key={filter.id}
            type='button'
            onClick={() => handleRemove(filter)!}
            className={styles.button}
          >
            <span>{filter.title}</span>
            <CrossSVG />
          </ButtonUI>
        );
      })}
    </div>
  );
};
