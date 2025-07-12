import type { FC } from 'react';
import bellIcon from '@/assets/svg/notification/notification.svg';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modalBlock.module.css';

interface ExchangeProposedProps {
  onDone: () => void;
}

export const ExchangeProposed: FC<ExchangeProposedProps> = ({ onDone }) => (
  <>
    <img src={bellIcon} alt='Уведомление' className={styles.icon} />
    <h3 className={styles.heading}>Вы предложили обмен</h3>
    <p className={styles.text}>Теперь дождитесь подтверждения от пользователя.<br/>Вам придёт уведомление</p>
    <ButtonUI type='button' onClick={onDone} className={styles.confirm}>
      Готово
    </ButtonUI>
  </>
); 
