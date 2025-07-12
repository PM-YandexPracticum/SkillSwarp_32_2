import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const DoneBigSVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 78 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 78 78'
  >
    <path
      stroke={color}
      strokeWidth='1.5'
      d='M76.5 39c0 20.71-16.79 37.5-37.5 37.5S1.5 59.71 1.5 39 18.29 1.5 39 1.5 76.5 18.29 76.5 39Z'
    />
    <path
      stroke={color}
      strokeLinecap='round'
      strokeWidth='1.5'
      d='m25.85 39.84 6.506 6.506a4.87 4.87 0 0 0 6.888 0l14.442-14.444'
    />
  </svg>
);
