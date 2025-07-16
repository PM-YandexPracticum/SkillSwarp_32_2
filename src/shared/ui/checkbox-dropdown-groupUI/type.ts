import type { TMainSkillFilter } from '@/shared/global-types';

export type CheckBoxDropDownGroupProps = {
  title: string;
  filters: TMainSkillFilter[];
  onChange: (updatedFilters: TMainSkillFilter[]) => void;
  className?: string;
};
