import type { FC, ReactNode } from 'react';
import { useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { ModalUI } from './modalUI';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modals');

export const Modal: FC<ModalProps> = memo(({ title, onClose, children }) => {
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
}); 

Modal.displayName = 'Modal';