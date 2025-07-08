// Просто тестовый компонент чтобы посмотреть как работает. Необходимо переписать на реальный

import { MoonSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
import type { FC } from 'react';

export const MoonButton:FC = () => {
  return (
    <ButtonUI type='button' onClick={() => {alert('Я кнопка смены темы');}}>
      <MoonSVG color='purple'/>
    </ButtonUI>
  );
};
