import type { ReactNode } from 'react';

export interface CardListProps {
  children: ReactNode;
  title: string;
  handleOpen?: () => void;
}
