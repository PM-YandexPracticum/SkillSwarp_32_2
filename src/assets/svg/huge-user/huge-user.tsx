import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const HugeUserSVG: FC<SVGType> = ({ color = '#000', size = 152 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 152 152'
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M76 84.333c13.807 0 25-11.193 25-25s-11.193-25-25-25-25 11.193-25 25 11.193 25 25 25ZM117.667 117.667c0-18.417-18.659-33.334-41.667-33.334-23.008 0-41.666 14.917-41.666 33.334'
    />
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M126 1H26C12.193 1 1 12.193 1 26v100c0 13.807 11.193 25 25 25h100c13.807 0 25-11.193 25-25V26c0-13.807-11.193-25-25-25Z'
    />
  </svg>
);
