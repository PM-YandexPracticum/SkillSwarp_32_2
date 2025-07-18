import type { SortType, TCard } from '@/shared/global-types';

export interface CardListProps {
  cards: TCard[];
  title: string;
  handleOpen?: () => void;
  handleSort?: () => void;
  sortType?: SortType;
  loading?: boolean;
}
