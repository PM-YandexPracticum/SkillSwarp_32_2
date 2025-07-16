import { ArrowLeftSVG } from '@/assets/svg';
import { ButtonUI } from '../buttonUI';
import type { FC } from 'react';
import type { WayUIProps } from './type';

import styles from './way.module.css';

export const WayUI: FC<WayUIProps> = ({ card }) => {
  return (
    <div className={styles.way_container}>
      <ButtonUI className={styles.button} type='link' to='/'>
        <ArrowLeftSVG size='24px' />
      </ButtonUI>
      <span
        className={styles.title}
      >{`Главая / ${card.teachSkill[0].type} / ${card.teachSkill[0].subType} / ${card.teachSkill[0].title}`}</span>
    </div>
  );
};
