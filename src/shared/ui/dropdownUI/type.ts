import type { ReactNode } from 'react';

export type DropdownOption = {
  name: string;
  id: string;
}

export type DropdownUIProps = {
  value: DropdownOption | DropdownOption[];
  withFilter?: boolean;
  isMultiSelect?: boolean;
  placeholder?: string;
  children: (props: {
    filter: string,
  }) => ReactNode;
};
