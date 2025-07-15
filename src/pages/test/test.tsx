import {
  AddSVG,
  ArrowLeftSVG,
  ArrowSquareRightSVG,
  MoonSVG,
  RadiobuttonActiveSVG,
  SearchSVG,
} from '@/assets/svg';
import { LikeSVG } from '@/assets/svg/like';
import { NotificationSVG } from '@/assets/svg/notification';
import { getUserById } from '../../api/skill-swap-api';
import { type FC } from 'react';
import { ButtonUI } from '@/shared/ui';

export const Test: FC = () => {
  async function alertUser(id: string) {
    await getUserById(id).then((data) => {
      alert(data.name);
    });
  }

  return (
    <>
      <ButtonUI type='button' onClick={() => alertUser('4574')}>
        <AddSVG color='purple' />
      </ButtonUI>

      <ArrowLeftSVG color='purple' />
      <ArrowSquareRightSVG />
      <MoonSVG />
      <LikeSVG />
      <NotificationSVG />
      <SearchSVG />
      <RadiobuttonActiveSVG />
    </>
  );
};
