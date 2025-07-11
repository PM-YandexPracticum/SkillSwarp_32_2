export type HeaderUserData = {
  name: string;
  image: string;
}

export type TAppHeaderUIProps = {
  onSkillsClick: () => void;
  onToogleTheme: () => void;
  onNotificationClick: () => void;
  onLikeClick: () => void;
  onClearButtonClick: () => void;
  user: HeaderUserData | undefined;
};
