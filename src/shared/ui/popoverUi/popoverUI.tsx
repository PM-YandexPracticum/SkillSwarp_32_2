import type { FC } from 'react';
import type { PopoverUIProps } from './type';
import clsx from 'clsx';

import styles from './popverUI.module.css';

export const PopoverUI: FC<PopoverUIProps> = ({ isVisible, children, positionClass }) => {
  return (
    <div className={clsx(styles.popover, positionClass, !isVisible && styles.not_visible)}>
      {children}
    </div>
  );
};
