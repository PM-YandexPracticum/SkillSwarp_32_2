import { AddSVG, ArrowLeftSVG, ArrowSquareRightSVG, MoonSVG, RadiobuttonActiveSVG, SearchSVG } from '@/assets/svg';
import { LikeSVG } from '@/assets/svg/like';
import { NotificationSVG } from '@/assets/svg/notification';
import { SearchFieldUI } from '@/shared/ui';
import { MoonButton } from '@/widgets';
import type { FC } from 'react';

export const Test: FC = () => {
  return (
    <>
      <MoonButton />
      <AddSVG color='purple' />
      <ArrowLeftSVG color='purple' />
      <ArrowSquareRightSVG />
      <MoonSVG />
      <LikeSVG />
      <NotificationSVG />
      <SearchSVG />
      <RadiobuttonActiveSVG/>
    </>
  );
};
