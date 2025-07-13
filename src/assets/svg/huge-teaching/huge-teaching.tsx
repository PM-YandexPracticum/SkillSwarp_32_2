import type { FC } from 'react';
import type { SVGType } from '../svg.type';

export const HugeTeachingSVG: FC<SVGType> = ({ color = '#000', size = 200 }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    width={size}
    height={size}
    viewBox='0 0 200 200'
  >
    <path
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M107.496 123.329c-17.19 44.998-65.307 0-82.496 44.998m101.245-44.998h11.257c17.676 0 26.519 0 32.008-5.49 5.49-5.49 5.49-14.332 5.49-32.008v-15c0-17.676 0-26.518-5.49-32.008-5.489-5.49-14.317-5.49-32.008-5.49h-29.999c-17.676 0-26.51 0-32 5.49-4.65 4.65-5.37 11.707-5.475 24.509M66.248 123.329c10.355 0 18.749-8.394 18.749-18.749 0-10.355-8.394-18.75-18.749-18.75-10.355 0-18.75 8.395-18.75 18.75s8.395 18.749 18.75 18.749ZM99.996 63.332h44.998m0 29.998h-22.499'
    />
  </svg>
);
