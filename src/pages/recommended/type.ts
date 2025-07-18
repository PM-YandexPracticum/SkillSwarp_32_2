import type { TCard } from '@/shared/global-types';

export type RecommendedProps = {
  cards: TCard[];
  userCard?: TCard | null;
};
