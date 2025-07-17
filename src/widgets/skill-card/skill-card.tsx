import styles from './skill-card.module.css';
import type { TSkillCardProps } from './types';
import { useCallback, useMemo } from 'react';
import { SkillCardMenu } from './skill-card-menu';
import { SkillCardButtons } from './skill-card-buttons';
import { SkillCardContent } from './skill-card-content';
import { SkillImageGalleryUI } from '@/shared/ui';

export const SkillCard = ({
    card, 
    liked = false,
    type = 'offer',
    likeHandler,
  }: TSkillCardProps) => {
  const shareHandler = useCallback(() => {
    const url = location.href;
    navigator.clipboard.writeText(url);
  }, []);

  const offerHandler = useCallback(() => {}, []);

  const editHandler = useCallback(() => {}, []);

  const saveHandler = useCallback(() => {}, []);

  const acceptHandler = useCallback(() => {}, []);

  const declineHandler = useCallback(() => {}, []);

  const actionButtons = useMemo(() => (
    <SkillCardButtons
      type={type}
      handlers={{
        offer: offerHandler,
        edit: editHandler,
        save: saveHandler,
        accept: acceptHandler,
        decline: declineHandler,
      }}
    />
  ), [acceptHandler, declineHandler, editHandler, offerHandler, saveHandler, type]);

  return (
    <div className={styles.container}>
      <SkillCardMenu 
        liked={liked} 
        likeHandler={likeHandler} 
        shareHandler={shareHandler}
      />
      <div className={styles.content}>
        <SkillCardContent card={card}>{actionButtons}</SkillCardContent>
   
        <div className={styles['content-gallery']}>
          <SkillImageGalleryUI images={card.skillImages || []} />
        </div>
      </div>
    </div>
  );
};
