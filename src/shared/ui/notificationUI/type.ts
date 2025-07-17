import type { genderType, offerSkillType } from '@/shared/global-types';

export type TNotificationUIProps = {
  offer: offerSkillType;
  isRead: boolean;
  partnerName: string;
  typeOfExchange: 'incoming' | 'outgoing';
  partnerGender: genderType;
};
