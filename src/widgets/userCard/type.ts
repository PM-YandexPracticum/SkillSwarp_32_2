import type { TCard, TUser } from '@/shared/global-types';

export interface UserCardProps {
  card: TCard;
  type: 'short' | 'full';
  user: TUser;
}
