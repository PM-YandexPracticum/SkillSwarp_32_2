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
import { addUser, getUserById } from '../../api/skill-swap-api';
import { type FC } from 'react';
import { ButtonUI } from '@/shared/ui';
import { FilterBlock } from '@/widgets';
import type { TSubFilter } from '@/shared/ui/checkboxDropdownUI/type';
import type { filtersType } from '@/shared/ui/radio-button-groupUI/type';


export const Test: FC = () => {
  async function alertUser(id: string) {
    await getUserById(id).then((data) => {
      alert(data.name);
    });
  }

  function getFilterValue(data: filtersType[]) {
    console.log(data);
  }

  function getSkillFilterValue(data: TSubFilter[]) {
    console.log(data);
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
            incoming: [],
            outgoing: []
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
      <FilterBlock
        onEducationChange={getFilterValue}
        onGenderChange={getFilterValue}
        onSkillChange={getSkillFilterValue}
        onCityChange={getSkillFilterValue}
      />
    </>
  );
};
