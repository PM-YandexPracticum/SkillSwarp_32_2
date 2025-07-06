import './styles.css';
import avatar from '../../../images/profile-example.png';

export const ProfileMenu = () => {
  return (
    <aside className='profile-menu'>
      <div className='profile-menu__info'>
        {/* ToDo: Данные - хардкод заглушка. Позже, заменить на данные с сервера */}
        <img src={avatar} alt='Изображение: аватар пользователя' className='profile-menu__avatar' />
        <div className='profile-menu__rating'>
          <span className='profile-manu__rating-item'>★</span>
          <span className='profile-manu__rating-item'>★</span>
          <span className='profile-manu__rating-item'>★</span>
          <span className='profile-manu__rating-item'>★</span>
        </div>
        <h2 className='profile-menu__user-name'>Иван Иванов</h2>
        <div className='profile-menu__user-data'>Москва, 19 лет</div>
        <p className='profile-menu__description'>Краткая информация о себе здесь</p>
      </div>

      <div className='profile-menu__nav'>
        <ul className='profile-menu__nav-menu'>
          <a className='profile-menu__nav-link' href='#'>
            <li className='profile-menu__nav-item'>Личные данные</li>
          </a>
          <a className='profile-menu__nav-link' href='#'>
            <li className='profile-menu__nav-item'>Заявки</li>
          </a>
          <a className='profile-menu__nav-link' href='#'>
            <li className='profile-menu__nav-item profile-menu__nav-item--active'>Мои навыки</li>
          </a>
          <a className='profile-menu__nav-link' href='#'>
            <li className='profile-menu__nav-item'>Сессии</li>
          </a>
          <a className='profile-menu__nav-link' href='#'>
            <li className='profile-menu__nav-item'>Избранное</li>
          </a>
        </ul>
      </div>
    </aside>
  );
};
