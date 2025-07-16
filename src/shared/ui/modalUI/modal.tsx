import type { ReactNode } from 'react';
import { useEffect} from 'react';
import ReactDOM from 'react-dom';
import { ModalUI } from './modalUI';
import React from 'react';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modals');

export const Modal = React.memo(({ title, onClose, children }:ModalProps)=> {
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
