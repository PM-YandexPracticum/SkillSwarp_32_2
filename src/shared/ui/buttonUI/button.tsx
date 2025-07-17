import type { FC } from 'react';
import type { ButtonUIProps } from './type';
import { Link } from 'react-router-dom';

// пропсы будут добавляться уже непосредственно в родительском компоненте

export const ButtonUI: FC<ButtonUIProps> = ({ type, onClick, children, className, to }) => {
  return type === 'button' ? (
    <button  className={className} onClick={onClick} type='button'>
      {children}
    </button>
  ) : type === 'link' ? (
    <Link to={to || '#'} className={className}>
      {children}
    </Link>
  ) : (
    <button className={className} type='submit'>
      {children}
    </button>
  );
};
