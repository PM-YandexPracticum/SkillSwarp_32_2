import type { TSubFilter } from '@/shared/ui/checkboxDropdownUI/type';
import type { filtersType } from '@/shared/ui/radio-button-groupUI/type';

export type FilterBlockProps = {
  onEducationChange: (selectedValue: filtersType[]) => void;
  onGenderChange: (selectedValue: filtersType[]) => void;
  onSkillChange: (selectedValue: TSubFilter[]) => void;
  onCityChange: (selectedValue: TSubFilter[]) => void;
};
