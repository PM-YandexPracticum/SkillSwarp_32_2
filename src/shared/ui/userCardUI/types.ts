import type { TCard } from '@/shared/global-types';

export interface skill {
  title: string;
  type: 'business' | 'art' | 'language' | 'education' | 'comfort' | 'lifestyle' | 'other';
}

export interface UserCardUIProps {
  setLike: () => void;
  card: TCard;
  type: 'full' | 'short';
  isLiked: boolean | undefined;
}
