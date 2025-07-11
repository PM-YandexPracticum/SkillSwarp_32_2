import type { FC } from 'react';
import { clsx } from 'clsx';
import styles from './progressBar.module.css';
import type { ProgreessBarProps } from './type';

export const ProgressBar: FC<ProgreessBarProps> = ({ steps, current }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{`Шаг ${current} из ${steps}`}</span>
      <ul className={styles.progress_bar}>
        {Array.from({ length: steps }).map((__, index) => (
          <li key={index}>
            <div
              className={clsx(styles.progress_step, {
                [styles.progress_step__active]: index + 1 <= current,
              })}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
