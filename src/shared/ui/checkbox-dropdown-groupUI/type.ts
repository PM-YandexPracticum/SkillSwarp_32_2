import type { TMainSkillFilter, TSkillSubFilter } from '@/shared/global-types';

export type CheckBoxDropDownGroupProps = {
  title: string;
  filters: TMainSkillFilter[];
  onChange:(selectedValues: TSkillSubFilter[]) => void;
}
