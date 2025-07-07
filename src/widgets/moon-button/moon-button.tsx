// Просто тестовый компонент чтобы посмотреть как работает. Необходимо переписать на реальный

import { ButtonUI } from '@/shared/ui';
import moonSVG from '../../assets/svg/moon.svg';
import type { FC } from 'react';

export const MoonButton:FC = () => {
  return (
    <ButtonUI type='button' onClick={() => {alert('Я кнопка смены темы');}}>
      <img src={moonSVG} alt='Переключение темы' width={24} height={24} />
    </ButtonUI>
  );
};
