// src/widgets/like-button/like-button.tsx
import type { FC } from 'react';
import { ButtonUI } from '@/shared/ui';
import { LikeSVG } from '@/assets/svg/like';
import styles from './like-button.module.css';

interface LikeButtonAsButton {
  type: 'button';
  onClick: () => void;
  to?: never;
  className?: string;
  isLiked?: boolean;
  showCount?: boolean;
  count?: number;
}

interface LikeButtonAsLink {
  type: 'link';
  onClick?: never;
  to: string;
  className?: string;
  isLiked?: boolean;
  showCount?: boolean;
  count?: number;
}

type LikeButtonProps = LikeButtonAsButton | LikeButtonAsLink;

export const LikeButton: FC<LikeButtonProps> = ({
  type,
  onClick,
  to,
  className,
  isLiked = false,
  showCount = false,
  count = 0
}) => {
  const buttonClass = `${styles.like_button} ${isLiked ? styles.liked : ''} ${className || ''}`;
  const ariaLabel = type === 'link' ? 'Избранное' : isLiked ? 'Убрать из избранного' : 'Добавить в избранное';

  return (
    <ButtonUI
      type={type}
      onClick={onClick}
      to={to}
      className={buttonClass}
      aria-label={ariaLabel}
    >
      <div className={styles.content}>
        <LikeSVG 
          contour={isLiked ? 'var(--alarm-color)' : 'currentColor'}
          color={isLiked ? 'var(--alarm-color)' : 'transparent'}
        />
        {showCount && count > 0 && (
          <span className={styles.count}>{count}</span>
        )}
      </div>
    </ButtonUI>
  );
};