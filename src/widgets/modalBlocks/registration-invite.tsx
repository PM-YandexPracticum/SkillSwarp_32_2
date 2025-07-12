import type { FC } from 'react';
import userIcon from '@assets/svg/huge-user/huge-user.svg';
import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modalBlock.module.css';

interface RegistrationInviteProps {
  onRegister: () => void;
  onCancel: () => void;
}

export const RegistrationInvite: FC<RegistrationInviteProps> = ({ onRegister, onCancel }) => (
  <>
    <img src={userIcon} alt='Пользователь' className={styles.icon} />
    <h3 className={styles.heading}>Пожалуйста зарегистрируйтесь в SkillSwap!</h3>
    <p className={styles.text}>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими пользователями</p>
    <div className={styles.actions}>
      <ButtonUI type='button' onClick={onCancel} className={styles.cancel}>
        Отмена
      </ButtonUI>
      <ButtonUI type='button' onClick={onRegister} className={styles.confirm}>
        Регистрация
      </ButtonUI>
    </div>
  </>
); 
