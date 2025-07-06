import type { FC } from 'react';
import { formatAge } from '../../lib/helpers/helpers';
import heart from '../../../assets/react.svg';
import type { skill, UserCardUIProps } from './types';
import './user-card.scss';

export const UserCardUI: FC<UserCardUIProps> = ({
  skills,
  desired,
  buttonClick,
  user,
  type,
  setLike,
}) => {
  // метод по созданию списка навыков. Будет лучше если он будет лежать здесь
  const renderSkills = (skills: skill[], limit = 2) => {
    const firstSkills = skills.slice(0, limit);
    const restCount = skills.length - limit;

    return (
      <>
        {firstSkills.map((skill, index) => (
          // пока непонятно, как будет задан цвет для каждого скила, нужно будет обсудить это. за ранее добавил тип под каждый цвет(см. в фигме)
          <li key={index} className='user_card__skill'>
            {skill.title}
          </li>
        ))}

        {restCount > 0 && <div className='user_card__skill'>{`+${restCount}`}</div>}
      </>
    );
  };
  // сделал ui с SASS-препроцессором
  //можно использовать модули, они без проблем сочитаются с препроцессором
  return (
    <article className='user_card'>
      <div className='user_card__info'>
        <div className='user_card__profile_image'>
          <img src={user.image} alt='фотография пользователя' />
        </div>
        <div className='user_card__user_data'>
          <span className='user_card__user_data__name'>{user.name}</span>
          <span className='user_card__user_data__other'>{`${user.city}, ${formatAge(user.age)}`}</span>
        </div>
        {type === 'short' && (
          // заглушка, в скором времени добавлю кастомную кнопку
          <div className='user_card__heart_container' onClick={() => setLike()}>
            <img src={heart} alt='кнопка лайка' width={24} height={24} />
          </div>
        )}
      </div>
      {/* заметил что карточка по сути переиспользуется на странице выбранных карточек, добавил проверку там где надо*/}
      {type === 'full' && <p className='user_card__user_description'>{user.description}</p>}
      <div className='user_card__skills_section'>
        <div className='user_card__skills'>
          <span className='user_card__text'>Может научить</span>
          <ul className='user_card__list'>{renderSkills(skills, 2)}</ul>
        </div>
        <div className='user_card__skills'>
          <span className='user_card__text'>Хочет научиться</span>
          <ul className='user_card__list'>{renderSkills(desired, 2)}</ul>
        </div>
      </div>
      {/*заглушка, в скором времени добавлю кастомную кнопку*/}
      {type === 'short' && (
        <button onClick={() => buttonClick()} className='user_card__button'>
          Подробнее
        </button>
      )}
    </article>
  );
};
