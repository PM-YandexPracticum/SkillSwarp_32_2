import userIcon from '../../assets/svg/huge-user/huge-user-modal.svg';
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modal-block.module.css';

interface RegistrationInviteProps {
  onRegister: () => void;
  onCancel: () => void;
}

export const RegistrationInvite: FC<RegistrationInviteProps> = ({ onRegister, onCancel }) => (

  <div className={styles.modalContent}>

    <div className={styles.iconWrapper}>
      <img src={userIcon} alt='Профиль пользователя' className={styles.icon} width={100} height={100} />
    </div>

    <div className={styles.textBlockInvite}>
      <h3 className={styles.heading}>Пожалуйста зарегистрируйтесь вSkillSwap!</h3>
      <p className={styles.text}>
        Присоединяйтесь к SkillSwap и обменивайтесь<br />
        знаниями и навыками с другими пользователями
      </p>
    </div>

    <div className={styles.actions}>
      <ButtonUI type='button' onClick={onCancel} className={styles.cancel}>
        Отмена
      </ButtonUI>

      <ButtonUI type='button' onClick={onRegister} className={styles.confirm}>
        Регистрация
      </ButtonUI>
    </div>

  </div>

); 
