import React from 'react';
import type { TSkillCardContentProps } from './types';
import styles from './skill-card.module.css';

export const SkillCardContent = React.memo(({ card, children }: TSkillCardContentProps) => {
  return (
    <div className={styles['content-info']}>
      <h2 className={styles.title}>{card.title}</h2>
      <span className={styles.breadcrumbs}>
        <span>{card.skillType}</span> /{' '}
        <span>{card.skillSubType}</span>
      </span>
      <p className={styles.description}>{card.description}</p>
      <div className={styles['buttons-container']}>{children}</div>
    </div>
  );
});

SkillCardContent.displayName = 'SkillCardContent';
