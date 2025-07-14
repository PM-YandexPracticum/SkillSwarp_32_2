import type { TMainSkillFilter, TSkillSubFilter } from '@/shared/global-types';

export type CheckBoxGroupProps = {
  title: string;
  filters: TMainSkillFilter[];
  onChange:(selectedValues: TSkillSubFilter[]) => void;
}
