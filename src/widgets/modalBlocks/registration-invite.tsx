import type { FC } from 'react';

import { ButtonUI } from '@/shared/ui/buttonUI/button';
import styles from './modal-block.module.css';
import { HugeUserSVG } from '@/assets/svg/huge-user';

interface RegistrationInviteProps {
  onRegister: () => void;
  onCancel: () => void;
}

export const RegistrationInvite: FC<RegistrationInviteProps> = ({ onRegister, onCancel }) => (
  <>
    <HugeUserSVG/>
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
