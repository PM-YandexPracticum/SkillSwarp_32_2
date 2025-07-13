import type { ChangeEvent } from 'react';

export type InputUIProps = {
  type: 'text' | 'password' | 'email' | 'textarea',
  placeholder?: string,
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  value: string,
  name: string,
  tip?: string,
  error?: boolean,
  errorText?: string,
  label?: string,
  icon?: 'password' | 'edit',
  rows?: number,
};
