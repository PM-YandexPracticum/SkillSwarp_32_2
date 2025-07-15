import type { TUser } from '@/shared/global-types';

export type HeaderUserData = Pick<TUser, 'name' | 'image'>;

export type TAppHeaderUIProps = {
  onSkillsClick: () => void;
  onToggleTheme: () => void;
  onNotificationClick: () => void;
  onLikeClick: () => void;
  onClearButtonClick: () => void;
  user: HeaderUserData | undefined;
  isLoginOrRegister: boolean;
};
