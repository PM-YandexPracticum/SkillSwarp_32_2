import React from 'react';
import styles from './modal-exchange.module.css';

interface ModalExchangeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalExchange: React.FC<ModalExchangeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrapper}>
          <svg width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M14.696 60.3875C13.8973 65.615 17.4635 69.2412 21.8285 71.0487C38.5648 77.9862 61.8523 77.9862 78.5885 71.0487C82.9535 69.2412 86.5198 65.6112 85.721 60.3875C85.2335 57.1737 82.8073 54.5 81.011 51.8862C78.6598 48.4212 78.4273 44.645 78.4235 40.625C78.4273 25.0925 65.7973 12.5 50.2085 12.5C34.6198 12.5 21.9898 25.0925 21.9898 40.625C21.9898 44.645 21.7573 48.425 19.4023 51.8862C17.6098 54.5 15.1873 57.1737 14.696 60.3875Z" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35.2085 76.25C36.926 82.7188 42.9935 87.5 50.2085 87.5C57.4272 87.5 63.4872 82.7188 65.2085 76.25" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.title}>Вы предложили обмен</div>
        <div className={styles.text}>Теперь дождитесь подтверждения. Вам придёт уведомление</div>
        <button className={styles.button} onClick={onClose}>Готово</button>
      </div>
    </div>
  );
}; 