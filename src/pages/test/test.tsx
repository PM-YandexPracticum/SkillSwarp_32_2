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
// import { MoonButton } from '@/widgets';
import { addUser, getUserById } from '../../api/skill-swap-api';
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui';

export const Test: FC = () => {
  async function alertUser(id: string) {
    await getUserById(id).then((data) => {
      alert(data.name);
    });
  }

  return (
    <>
      <ButtonUI
        type='button'
        onClick={() =>
          addUser({
            gender: 'female',
            name: 'Екатерина',
            city: 'Москва',
            age: 24,
            mail: 'katya@mail.ru',
            password: 'Qwerty123!',
            description: 'Описание',
            image: './#',
            likes: ['card-3', 'card-24', 'card-25'],
          })
        }
      >
        <NotificationSVG color='red' />
      </ButtonUI>

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
