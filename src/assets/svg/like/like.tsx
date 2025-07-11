import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const LikeSVG: FC<SVGType> = ({ color = 'var(--bg-color)', size = 24 , contour = 'var(--text-redesigned)'}) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M7.95 4C5.216 4 3 6.152 3 8.807 3 13.614 8.85 17.983 12 19c3.15-1.017 9-5.386 9-10.193C21 6.152 18.784 4 16.05 4A4.99 4.99 0 0 0 12 6.042 4.99 4.99 0 0 0 7.95 4'
      fill={color}
      stroke={contour}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
