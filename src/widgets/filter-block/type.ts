import type { commonFilterType, TCityFilter, TMainSkillFilter } from '@/shared/global-types';


export type FilterBlockProps = {
  educationFilters: commonFilterType[];
  cityFilters: TCityFilter[];
  skillFilters: TMainSkillFilter[];
  genderFilters: commonFilterType[];
  onEducationChange: (selectedValue: commonFilterType[]) => void;
  onGenderChange: (selectedValue: commonFilterType[]) => void;
  onSkillChange: (selectedValue: TMainSkillFilter[]) => void;
  onCityChange: (selectedValue: string) => void;
};
