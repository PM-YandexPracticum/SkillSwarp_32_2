import type { skill, UserData } from '@/shared/ui/user-card/types';
import { UserCardUI } from '@/shared/ui/user-card/user-card';
import type { FC } from 'react';

export const UserCard: FC = () => {
    //заглушки. временное решение, пока нету БД. в PR добавлю пропсы для UserCard: user, type, skills, desired
    const skills: skill[] = [
        {title: 'Английский язык',
        type: 'art'
        }
    ];
    const desired: skill[] = [
        {title: 'aawdwad',
        type: 'art'
        },
        {title: 'aawdwad',
        type: 'art'
        },
        {title: 'aawdwad',
        type: 'art'
        }
    ];
    const buttonClick = () => {
       // console.log('button clicked');
    };
    const setLike = () => {
        //console.log('like');
    };
    const user: UserData = {
        name: 'Илона',
        age: 33,
        city: 'Екатеринбург',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Умный человек фото'
    };
    return <UserCardUI skills={skills} desired={desired} buttonClick={buttonClick} user={user} type={'short'} setLike={setLike} />;
};
