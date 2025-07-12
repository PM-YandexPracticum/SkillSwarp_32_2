import type { TSkillCard } from 'db/types';
import type { ReactNode } from 'react';

export type TSkillCardProps = {
  card: TSkillCard;
  type: 'edit' | 'received' | 'sent' | 'offer';
  liked?: boolean;
  likeHandler: () => void;
};

export type TSkillCardMenuProps = {
  liked: boolean;
  likeHandler: () => void;
  shareHandler: () => void;
};

export type TSkillCardButtonsProps = {
  type: TSkillCardProps['type'];
  handlers: {
    offer: () => void;
    edit: () => void;
    save: () => void;
    accept: () => void;
    decline: () => void;
  }
}

export type TSkillCardContentProps = {
  card: TSkillCardProps['card'];
  buttons: ReactNode;
}
