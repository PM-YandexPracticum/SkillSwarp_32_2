import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const ShareSVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 24 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 24 24'
  >
    <path
      stroke={color}
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M17.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm-11 6.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'
    />
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='m15 6.788-6.33 3.835m0 2.659 6.67 3.942'
    />
    <path
      stroke={color}
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M17.5 16a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z'
    />
  </svg>
);
