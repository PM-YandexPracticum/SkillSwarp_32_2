import { ClockSVG } from '@/assets/svg/clock';
import { EditSVG } from '@/assets/svg/edit';
import { ButtonUI } from '@/shared/ui';
import React from 'react';
import type { TSkillCardButtonsProps } from './types';
import styles from './skill-card.module.css';

export const SkillCardButtons = React.memo(({ type, handlers }: TSkillCardButtonsProps) => {
  const stylesTransparent = `${styles.button} ${styles['button-transparent']}`;

  const { offer, accept, decline, edit, save } = handlers;

  switch (type) {
    case 'offer':
      return (
        <ButtonUI type='button' className={styles.button} onClick={offer}>
          Предложить обмен
        </ButtonUI>
      );
    case 'edit':
      return (
        <>
          <ButtonUI type='button' className={stylesTransparent} onClick={edit}>
            Редактировать <EditSVG color='currentColor' />
          </ButtonUI>
          <ButtonUI type='button' className={styles.button} onClick={save}>
            Готово
          </ButtonUI>
        </>
      );
    case 'received':
      return (
        <>
          <ButtonUI type='button' className={styles.button} onClick={accept}>
            Принять
          </ButtonUI>
          <ButtonUI type='button' className={stylesTransparent} onClick={decline}>
            Отклонить
          </ButtonUI>
        </>
      );
    case 'sent':
      return (
        <ButtonUI type='button' className={stylesTransparent} onClick={edit}>
          <ClockSVG />Обмен предложен
        </ButtonUI>
      );
  }
});
SkillCardButtons.displayName = 'SkillCardButtons';
