import type { genderType, offerSkillType } from '@/shared/global-types';

export type TNotificationUIProps = {
  offer: offerSkillType;
  partnerName: string;
  typeOfExchange: 'incoming' | 'outgoing';
  partnerGender: genderType;
};
