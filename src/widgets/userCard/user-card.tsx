import { UserCardUI } from '@/shared/ui/userCardUI/user-card';
import type { FC } from 'react';
import type { UserCardProps } from './type';
import { useDispatch } from 'react-redux';
import { disLikeCardThunk, likeCardThunk, saveLikedCardThunk } from '@/services/slices';
import type { AppDispatch } from '@/services/store';

export const UserCard: FC<UserCardProps> = ({ type, card, user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isLiked = user.likes.includes(card.userId);
  // console.log(isLiked)
  const setLike = async (cardId: string) => {
    if (user.name == '') {
      alert('Авторизуйся');
      return;
    }
    const updatedData = isLiked
      ? {
          ...user,
          likes: user.likes.filter((id) => id !== card.userId), // Удаляем ID
        }
      : { ...user, likes: [...user.likes, card.userId] };

    dispatch(saveLikedCardThunk({ userData: updatedData, userId: user.id })).unwrap();

    if (isLiked) {
      dispatch(disLikeCardThunk({ cardId, userId: user.userId })).unwrap();
    } else {
      dispatch(likeCardThunk({ cardId, userId: user.userId })).unwrap();
    }
  };
  return (
    // завернул карточку в список. тау будет правильней
    <li>
      <UserCardUI card={card} type={type} setLike={setLike} isLiked={isLiked} />
    </li>
  );
};

// console.log(user);
// console.log(
//   'Текущий пользователь',
//   user.id,
//   'Карточка которую тыкаем',
//   cardId,
//   'пользователь в которого сохраняем лайк',
//   card.userId,
//   'лайки',
//   user.likes
// );
