import { CARDS_DATA } from '@/shared/global-types/data-cards-example';
import { UserCardUI } from '@/shared/ui/userCardUI/user-card';
import type { FC } from 'react';

export const UserCard: FC = () => {
  //заглушки. временное решение, пока нету БД. в PR добавлю пропсы для UserCard: user, type, skills, desired
  const setLike = () => {};
  return (
    // завернул карточку в список. тау будет правильней
    <li>
      <UserCardUI
        card={CARDS_DATA[0]}
        type={'short'}
        setLike={setLike}
      />
    </li>
  );
};
