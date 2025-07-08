import { AddSVG, ArrowLeftSVG } from '@/assets/svg';
import { MoonButton } from '@/widgets';
import type { FC } from 'react';

export const Test: FC = () => {
  return <>
  <MoonButton/>
  <AddSVG color='purple'/>
  <ArrowLeftSVG color='purple'/>
  </>;
};
