import type { TSkillSubFilter } from '@/shared/global-types';

export type CheckboxDropdownUIProps = {
  label: string;
  options: TSkillSubFilter[];
  selectedOptions: TSkillSubFilter[];
  onSelect: (selected: TSkillSubFilter[]) => void;
  onClose?: () => void;
};
