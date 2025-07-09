import type { FC } from 'react';
import type { SkillItemProps } from './types';

import styles from './skill-item.module.css';

export const SkillItemUI: FC<SkillItemProps> = ({ className, children, type }) => {
  return <li className={`${className} ${styles[type as keyof typeof styles]}`}>{children}</li>;
};
