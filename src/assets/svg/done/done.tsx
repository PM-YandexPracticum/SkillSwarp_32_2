import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const DoneSVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 24 24'
  >
    <path stroke={color} strokeWidth='1.5' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    <path
      stroke={color}
      strokeLinecap='round'
      strokeWidth='1.5'
      d='m8.844 12.202 1.562 1.561a1.17 1.17 0 0 0 1.652 0l3.467-3.466'
    />
  </svg>
);
