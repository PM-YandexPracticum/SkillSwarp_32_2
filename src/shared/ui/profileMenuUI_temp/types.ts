export type ProfileMenuItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type ProfileUserInfo = {
  avatar: string;
  user: string;
  userData: string;
  description: string;
  rating?: number;
  // Зависит от того, как мы по итогу реализуем рейтинг (если он будет) — пока исхожу из того, что мы пробрасываем число и на его основе генерируем нужное кол-во спанов
};

export type ProfileMenuProps = {
  profileUserInfo: ProfileUserInfo;
  profileMenuItems: ProfileMenuItem[];
};
