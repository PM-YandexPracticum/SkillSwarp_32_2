import doneIcon from '../../assets/svg/done/done.svg';
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modal-block.module.css';

interface RegistrationSuccessProps {
  onDone: () => void;
}

export const RegistrationSuccess: FC<RegistrationSuccessProps> = ({ onDone }) => (
  <div className={styles.modalContent}>


    <div className={styles.iconWrapper}>
      <img src={doneIcon} alt='Успешно' className={styles.icon} width={100} height={100} />
    </div>


    <div className={styles.textBlockSuccess}>
      <h3 className={styles.heading}>Вы успешно зарегистрировались</h3>
      <p className={styles.text}>Теперь можете предложить обмен</p>
    </div>

    
    <div className={styles.actions}>
      <ButtonUI type='button' onClick={onDone} className={styles.confirm}>
        Готово
      </ButtonUI>
    </div>


  </div>
); 
