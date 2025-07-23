import type { ReactNode } from 'react';

// Сделал такие интерфейсы для того, чтобы не было коллизий между типами:
// onClick обязателен если type === button
// to обязателен если type === link

interface ButtonAsButton {
  type: 'button';
  onClick: () => void;
  children?: ReactNode;
  className?: string;
  to?: never;
  disabled?: boolean;
}

interface ButtonAsLink {
  type: 'link';
  onClick?: never;
  children?: ReactNode;
  className?: string;
  to: string;
  disabled?: boolean;
}

interface ButtonAsSubmit {
  type: 'submit';
  onClick?: never;
  children?: ReactNode;
  className?: string;
  to?: string;
  disabled?: boolean;
}

export type ButtonUIProps = ButtonAsButton | ButtonAsLink | ButtonAsSubmit;
