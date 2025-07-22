import type { SortType, TCard, TUser } from '@/shared/global-types';

export interface CardListProps {
  cards: TCard[];
  title: string;
  handleOpen?: string;
  handleSort?: () => void;
  sortType?: SortType;
  loading?: boolean;
  user: TUser;
}
