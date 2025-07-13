import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const HugeUserAccountSVG: FC<SVGType> = ({ color = '#000', width = 170, height = 152 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={width}
    height={height}
    viewBox='0 0 170 152'
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M101.667 51H135m-33.333 29.167h25M126.667 1H43.333C20.322 1 1.667 19.655 1.667 42.667v66.666C1.667 132.345 20.32 151 43.333 151h83.334c23.012 0 41.666-18.655 41.666-41.667V42.667C168.333 19.655 149.679 1 126.667 1Z'
    />
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M26.667 109.333c10.066-21.508 47.6-22.916 58.333 0M72.5 51a16.667 16.667 0 1 1-33.333 0A16.667 16.667 0 0 1 72.5 51Z'
    />
  </svg>
);
