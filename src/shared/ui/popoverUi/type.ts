import type { ReactNode } from 'react';

export interface PopoverUIProps {
  isVisible: boolean;
  children: ReactNode;
  positionClass: string;
}
