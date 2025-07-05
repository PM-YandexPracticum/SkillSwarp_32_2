
import type { FC } from 'react';
import styles from './card.module.css';
import type { CardUIProps } from './type';

export const CardUI: FC<CardUIProps> = ({ title, img }) => (
  <div className={styles.card}>
    <h1>{title}</h1>
    <img src={img}></img>
  </div>
);

export default CardUI;
