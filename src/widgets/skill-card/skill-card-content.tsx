import React from 'react';
import type { TSkillCardContentProps } from './types';
import styles from './skill-card.module.css';

export const SkillCardContent = React.memo(({ card, children }: TSkillCardContentProps) => {
  return (
    <div className={styles['content-info']}>
      {/* выводим первый тайтл из навыка. Или надо преобразовывать все данные */}
      <h2 className={styles.title}>{card.teachSkill[0].title}</h2>
      <span className={styles.breadcrumbs}>
        <span>{card.teachSkill[0].type}</span> /{' '}
        <span>{card.teachSkill[0].subType}</span>
      </span>
      <p className={styles.description}>{card.fullDescription}</p>
      <div className={styles['buttons-container']}>{children}</div>
    </div>
  );
});

SkillCardContent.displayName = 'SkillCardContent';
