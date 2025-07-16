import type { FC } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { TModalProps } from './type';
import { ModalUI } from './modalUI';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot
  );
}; 
