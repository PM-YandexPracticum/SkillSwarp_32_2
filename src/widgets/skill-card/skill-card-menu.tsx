import { LikeSVG } from '@/assets/svg/like';
import { MoreSquareSVG } from '@/assets/svg/more-square';
import { ShareSVG } from '@/assets/svg/share';
import { ButtonUI } from '@/shared/ui';
import React from 'react';
import type { TSkillCardMenuProps } from './types';
import styles from './skill-card.module.css';

export const SkillCardMenu = React.memo(({likeHandler, liked, shareHandler}: TSkillCardMenuProps) => (
  <div className={styles.menu}>
    <ButtonUI className={styles['button-share']} type='button' onClick={likeHandler}>
      <LikeSVG contour='currentColor' color={liked ? 'var(--accent-redesigned)' : 'transparent'} />
    </ButtonUI>
    <ButtonUI className={styles['button-share']} type='button' onClick={shareHandler}>
      <ShareSVG color='currentColor' />
    </ButtonUI>
    <ButtonUI className={styles['button-share']} type='button' onClick={() => {}}>
      <MoreSquareSVG color='currentColor' />
    </ButtonUI>
  </div>
));
SkillCardMenu.displayName = 'SkillCardMenu';
