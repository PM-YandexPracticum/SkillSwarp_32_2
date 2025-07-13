import type { ReactNode } from 'react';

export type CheckboxUIProps = {
  index?: number;
  label: string;
  value: string; 
  checked: boolean;
  ariaChecked?: 'true' | 'false' | 'mixed';
  onChange: (value: string) => void;
  children?: ReactNode;
}
