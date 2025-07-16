import type { ChangeEvent } from 'react';

export type InputUIProps = {
  type: 'text' | 'password' | 'email' | 'textarea' | 'number';
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number; // число тоже нужно поддерживать
  name: string;
  tip?: string;
  error?: boolean;
  errorText?: string;
  label?: string;
  icon?: 'password' | 'edit';
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
};
