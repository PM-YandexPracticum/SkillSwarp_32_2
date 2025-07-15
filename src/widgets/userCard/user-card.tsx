import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { UserCardUI } from '@/shared/ui/userCardUI/user-card';
import type { FC } from 'react';
import type { UserCardProps } from './type';

export const UserCard: FC<UserCardProps> = ({type, card}) => {
  //заглушки. временное решение, пока нету БД. в PR добавлю пропсы для UserCard: user, type, skills, desired
  const setLike = () => {};
  return (
    // завернул карточку в список. тау будет правильней
    <li>
      <UserCardUI
        card={card}
        type={type}
        setLike={setLike}
      />
    </li>
  );
};
