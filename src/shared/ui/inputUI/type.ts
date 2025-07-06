import type { ChangeEvent } from 'react';

export type InputUIProps = {
  type: 'text' | 'password' | 'email',
  placeholder?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  name: string,
  tip?: string,
  error?: boolean,
  errorText?: string,
  label?: string,
  icon?: 'password' | 'edit',
};
