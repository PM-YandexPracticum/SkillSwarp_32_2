import type { FC, ReactNode } from 'react';
import styles from './modalUI.module.css';

interface ModalUIProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export const ModalUI: FC<ModalUIProps> = ({ title, onClose, children }) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <button className={styles.close} onClick={onClose} aria-label='Закрыть модальное окно'>×</button>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  </div>
); 
