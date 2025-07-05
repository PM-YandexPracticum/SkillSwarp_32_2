import { CardUI } from '@/shared/ui';
import type { FC } from 'react';

export const Card: FC = () => {
  const word = 'Было слово';
  const url = 'https://i.pinimg.com/736x/2f/6e/ae/2f6eaea592523b7b2b3285e1c988e01d.jpg';
  console.log('Здесь бы какую нибудь логику');
  return (
      <CardUI title={word} img={url} />
  );
};
