import type { TSkillSubFilter } from '@/shared/global-types';

export type CheckboxDropdownUIProps = {
  label: string;
  options: TSkillSubFilter[];
  selectedOptions: TSkillSubFilter[];
  isOpen: boolean;
  onSelect: (selected: TSkillSubFilter[]) => void;
  onToggle: () => void;
  className?: string;
};
