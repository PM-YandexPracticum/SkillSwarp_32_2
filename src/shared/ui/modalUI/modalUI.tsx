import type { FC } from 'react';
import styles from './modalUI.module.css';
import type { TModalProps } from './type';

export const ModalUI: FC<TModalProps> = ({ title, onClose, children }) => (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <button className={styles.close} onClick={onClose} aria-label='Закрыть модальное окно'>×</button>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  </div>
); 
