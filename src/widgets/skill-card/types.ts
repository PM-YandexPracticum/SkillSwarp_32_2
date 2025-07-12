import type { TSkillCard } from 'db/types';

export type TSkillCardProps = {
  card: TSkillCard;
  edit?: boolean;
  liked?: boolean;
  offered?: boolean;
  likeHandler: () => void;
}
