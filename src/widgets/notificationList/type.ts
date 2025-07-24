import type { offerSkillType, THeaderUserData } from '@/shared/global-types';

export type TNotificationListProps = {
  user: THeaderUserData;
};

export interface GroupedNotifications {
  new: offerSkillType[];
  read: offerSkillType[];
}

// Определяем расширенный тип для уведомлений
type NotificationType = 'incoming' | 'outgoing';

export interface ExtendedOfferSkillType extends offerSkillType {
  type: NotificationType;
}
