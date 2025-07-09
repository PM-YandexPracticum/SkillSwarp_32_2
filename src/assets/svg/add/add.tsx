import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const AddSVG: FC<SVGType> = ({ color = 'var(--text-redesigned)', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill={color}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 12.75H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75'
      fill={color}
    />
    <path
      d='M12 18.75c-.41 0-.75-.34-.75-.75V6c0-.41.34-.75.75-.75s.75.34.75.75v12c0 .41-.34.75-.75.75'
      fill={color}
    />
    ß
  </svg>
);
