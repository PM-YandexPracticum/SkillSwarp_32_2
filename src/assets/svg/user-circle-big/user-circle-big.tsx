import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const UserCircleBigSVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 78 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 78 78'
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M63.925 67.02A31.21 31.21 0 0 0 39 54.624 31.2 31.2 0 0 0 14.075 67.02m49.85 0a37.5 37.5 0 1 0-49.85 0m49.85 0A37.4 37.4 0 0 1 39 76.499a37.38 37.38 0 0 1-24.925-9.48M51.5 29.625a12.5 12.5 0 1 1-25 0 12.5 12.5 0 0 1 25 0'
    />
  </svg>
);
