import type { FC } from 'react';
import type { ButtonUIProps } from './type';
import { Link } from 'react-router-dom';

// пропсы будут добавляться уже непосредственно в родительском компоненте

export const ButtonUI: FC<ButtonUIProps> = ({
  type,
  onClick,
  children,
  className,
  to,
  disabled,
  ...props
}) => {
  return type === 'button' ? (
    <button 
      className={className} 
      onClick={onClick} 
      type='button' 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ) : type === 'link' ? (
    <Link 
      to={to || '#'} 
      className={className}
      style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
    >
      {children}
    </Link>
  ) : (
    <button 
      className={className} 
      type='submit'
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
