import type { ReactNode } from 'react';

export type DropdownOption<T, D = undefined> = {
  name: string;
  id: T;
  data?: D;
}

export type DropdownUIProps<T, D = undefined> = {
  value: DropdownOption<T, D> | DropdownOption<T, D>[];
  withFilter?: boolean;
  isMultiSelect?: boolean;
  placeholder?: string;
  children: (props: {
    filter: string,
  }) => ReactNode;
};
