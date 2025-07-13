// Просто тестовый компонент чтобы посмотреть как работает. Необходимо переписать на реальный

import { MoonSVG } from '@/assets/svg';
import { ButtonUI } from '@/shared/ui';
import type { FC } from 'react';

type MoonButtonType = {
  onClick: () => void
}

export const MoonButton:FC<MoonButtonType> = ({onClick}) => {
  return (
    <ButtonUI type='button' onClick={onClick}>
      <MoonSVG color='purple'/>
    </ButtonUI>
  );
};
