import notificationIcon from '../../assets/svg/notification/notification.svg';
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modal-block.module.css';

interface ExchangeProposedProps {
  onDone: () => void;
}

export const ExchangeProposed: FC<ExchangeProposedProps> = ({ onDone }) => (
  <div className={styles.modalContent}>


    <div className={styles.iconWrapper}>
      <img src={notificationIcon} alt='Уведомление' className={styles.icon} width={100} height={100} />
    </div>


    <div className={styles.textBlockExchange}>
      <h3 className={styles.heading}>Вы предложили обмен</h3>
      <p className={styles.text}>
        Теперь дождитесь подтверждения от пользователя.<br />
        Вам придёт уведомление
      </p>
    </div>
    

    <div className={styles.actions}>
      <ButtonUI type='button' onClick={onDone} className={styles.confirm}>
        Готово
      </ButtonUI>
    </div>


  </div>
); 
