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
// import { AllSkills } from '@/shared/ui';
import { type FC } from 'react';
import { ButtonUI } from '@/shared/ui';
// import { AppHeaderUI } from '@/shared/ui/app-headerUI/app-header';
import { SkillPage } from '../skill-page';
import { NotificationUI } from '@/shared/ui/notificationUI';

export const Test: FC = () => {
  async function alertUser(id: string) {
    await getUserById(id).then((data) => {
      alert(data.name);
    });
  }
  return (
    <>
      {/* <ButtonUI
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
            outgoing: [],
          })
        }
      >
        <NotificationSVG color='red' />
      </ButtonUI> */}

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
      {/* <AppHeaderUI
        onSkillsClick={() => {}}
        onToogleTheme={() => {}}
        onNotificationClick={() => {}}
        onLikeClick={() => {}}
        onClearButtonClick={() => {}}
        user={undefined}
        // user={{ name: 'Мария', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
      /> */}
      {/* <AllSkills /> */}
      <NotificationUI 
        offer = {{
          userId: 'user-3',
          // status: 'pending',
          status: 'fulfilled',
          // status: 'rejected',
          createdAt: 1752065629156,
          isRead: false
          // isRead: true
        }}
        isRead = {false}
        partnerName = 'Татьяна'
        // typeOfExchange = 'incoming'
        typeOfExchange = 'outgoing'
        // partnerGender ='male' 
        partnerGender = 'female'
        />
    </>
  );
};
