import { UserCardUI } from '@/shared/ui/userCardUI/user-card';
import type { FC } from 'react';
import type { UserCardProps } from './type';
import { useSelector } from 'react-redux';
import { selectLikes } from '@/services/slices';

export const UserCard: FC<UserCardProps> = ({type, card}) => {

  const likes = useSelector(selectLikes)

  const isLiked = likes?.includes(card.userId)

  const setLike = () => {};
  return (
    // завернул карточку в список. тау будет правильней
    <li>
      <UserCardUI
        card={card}
        type={type}
        setLike={setLike}
        isLiked={isLiked}
      />
    </li>
  );
};
