import type { TMainSkillFilter } from '@/shared/global-types';
import React from 'react';

export interface AllSkillsProps {
  onClose: () => void;
  mainFilters: TMainSkillFilter[];
  headerRef?: React.RefObject<HTMLElement | null>;
}
