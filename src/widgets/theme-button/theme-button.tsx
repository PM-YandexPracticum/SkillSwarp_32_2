// src/widgets/theme-button/theme-button.tsx
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui';
import { MoonSVG } from '@/assets/svg';
import styles from './theme-button.module.css';

interface ThemeButtonProps {
  onClick: () => void;
  className?: string;
}

export const ThemeButton: FC<ThemeButtonProps> = ({ onClick, className }) => {
  return (
    <ButtonUI
      type='button'
      onClick={onClick}
      className={`${styles.theme_button} ${className || ''}`}
      aria-label='Переключение цветовой темы'
    >
      <MoonSVG />
    </ButtonUI>
  );
};