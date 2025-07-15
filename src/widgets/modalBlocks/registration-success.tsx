import type { FC } from 'react';
import doneIcon from '@/assets/svg/done/done.svg';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modal-block.module.css';

interface RegistrationSuccessProps {
  onDone: () => void;
}

export const RegistrationSuccess: FC<RegistrationSuccessProps> = ({ onDone }) => (
  <>
    <img src={doneIcon} alt='Успех' className={styles.icon} />
    <h3 className={styles.heading}>Вы успешно зарегистрировались</h3>
    <p className={styles.text}>Теперь можете предложить обмен</p>
    <ButtonUI type='button' onClick={onDone} className={styles.confirm}>
      Готово
    </ButtonUI>
  </>
); 
