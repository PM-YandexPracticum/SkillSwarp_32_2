import type { commonFilterType, TSkillSubFilter } from '@/shared/global-types';


export type FilterBlockProps = {
  onEducationChange: (selectedValue: commonFilterType[]) => void;
  onGenderChange: (selectedValue: commonFilterType[]) => void;
  onSkillChange: (selectedValue: TSkillSubFilter[]) => void;
  onCityChange: (selectedValue: TSkillSubFilter[]) => void;
};
