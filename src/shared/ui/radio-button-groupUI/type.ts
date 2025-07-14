import type { commonFilterType } from '@/shared/global-types';

export type RadioButtonGroupProps = {
  title?: string;
  filters: commonFilterType[];
  onChangeAction: (selectedValue: commonFilterType[]) => void;
};
