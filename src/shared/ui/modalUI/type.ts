import type { ReactNode } from 'react';

export interface TModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

