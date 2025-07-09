import React from 'react';
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <svg width='100' 
            height='100' 
            viewBox='0 0 100 100' 
            fill='none' 
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M74.925 78.0196C72.0131 74.1654 68.2463 71.0397 63.9212 68.8887C59.596 66.7377 54.8305 65.62 50 65.6238C45.1695 65.62 40.404 66.7377 36.0788 68.8887C31.7537 71.0397 27.9869 74.1654 25.075 78.0196M74.925 78.0196C80.6063 72.9662 84.6171 66.3052 86.4258 58.92C88.2344 51.5347 87.7553 43.7741 85.0519 36.6674C82.3486 29.5607 77.5489 23.4437 71.2891 19.1275C65.0294 14.8113 57.6056 12.5 50.0021 12.5C42.3986 12.5 34.9747 14.8113 28.715 19.1275C22.4553 23.4437 17.6555 29.5607 14.9522 36.6674C12.2489 43.7741 11.7698 51.5347 13.5784 58.92C15.387 66.3052 19.3937 72.9662 25.075 78.0196M74.925 78.0196C68.0659 84.1357 59.1898 87.5103 50 87.4988C40.8087 87.5113 31.9351 84.1366 25.075 78.0196M62.5 40.6238C62.5 43.939 61.183 47.1184 58.8388 49.4626C56.4946 51.8068 53.3152 53.1238 50 53.1238C46.6848 53.1238 43.5054 51.8068 41.1612 49.4626C38.817 47.1184 37.5 43.939 37.5 40.6238C37.5 37.3086 38.817 34.1291 41.1612 31.7849C43.5054 29.4407 46.6848 28.1238 50 28.1238C53.3152 28.1238 56.4946 29.4407 58.8388 31.7849C61.183 34.1291 62.5 37.3086 62.5 40.6238Z' stroke='#253017' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </div>
        <div className={styles.title}>Пожалуйста, войдите в аккаунт</div>
        <div className={styles.text}>Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми</div>
        <div className={styles.buttonRow}>
          <button className={styles.cancel} onClick={onClose}>Отмена</button>
          <button className={styles.login} onClick={onLogin}>Войти</button>
        </div>
      </div>
    </div>
  );
}; 
