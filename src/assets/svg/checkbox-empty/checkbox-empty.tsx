import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const CheckboxEmptySVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 24 }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M14.79 22H9.21C4.157 22 2 19.842 2 14.79V9.21C2 4.157 4.158 2 9.21 2h5.58C19.843 2 22 4.158 22 9.21v5.58c0 5.052-2.158 7.21-7.21 7.21M9.21 3.395c-4.29 0-5.815 1.526-5.815 5.814v5.582c0 4.288 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.526 5.814-5.814V9.209c0-4.288-1.526-5.814-5.814-5.814z'
      fill={color}
    />
  </svg>
);
