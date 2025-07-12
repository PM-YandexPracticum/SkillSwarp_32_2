import React from 'react';
import type { TSkillCardContentProps } from './types';
import styles from './skill-card.module.css';

export const SkillCardContent = React.memo(({ card, buttons }: TSkillCardContentProps) => {
  return (
    <div className={styles['content-info']}>
      <h2 className={styles.title}>{card.title}</h2>
      <span className={styles.breadcrumbs}>
        <span className={styles.test}>{card.filterType}</span> /{' '}
        <span>{card.subFilterType}</span>
      </span>
      <p className={styles.description}>{card.description}</p>
      <div className={styles['buttons-container']}>{buttons}</div>
    </div>
  );
});

SkillCardContent.displayName = 'SkillCardContent';
