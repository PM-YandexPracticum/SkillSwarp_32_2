import { useEffect } from 'react';
import React from 'react';

type UseOutsideClickClose = {
  isOpen: boolean;
  onChange: (newValue: boolean) => void;
  onClose?: () => void;
  rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
  onChange,
}: UseOutsideClickClose) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (!rootRef.current || !(target instanceof Node)) return;
      if (!rootRef.current.contains(target)) {
        if (isOpen) {
          onClose?.();
          onChange(false);
        }
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, onChange, rootRef]);
};
