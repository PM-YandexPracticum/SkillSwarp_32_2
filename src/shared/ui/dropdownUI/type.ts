import type { ReactNode } from 'react';

export type DropdownOption = {
  name: string;
  id: string;
  value: string;
}

export type DropdownUIProps = {
  options: DropdownOption[];
  value: DropdownOption | DropdownOption[];
  withFilter?: boolean;
  isMultiSelect?: boolean;
  placeholder?: string;
  children: (props: {
    filter: string,
  }) => ReactNode;
};
