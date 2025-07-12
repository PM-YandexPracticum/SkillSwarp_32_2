import { ButtonUI } from '@/shared/ui';
import styles from './skill-card.module.css';
import type { TSkillCardProps } from './types';
// import { EditSVG } from '@/assets/svg/edit';
// import { LikeSVG } from '@/assets/svg/like';
// import { ShareSVG } from '@/assets/svg/share';
// import { MoreSquareSVG } from '@/assets/svg/more-square';

export const SkillCard = ({
    card, 
    liked = false,
    edit = false, 
    offered = false,
    likeHandler
  }: TSkillCardProps) => {
  const tradeButtonHandler = () => {
    return;
  };

  const shareHandler = () => {
    const url = location.href;
    navigator.clipboard.writeText(url);
  };

  const editHandler = () => {
    return;
  };

  const saveHandler = () => {
    return;
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ButtonUI 
          className={styles['button-share']} 
          type='button' 
          onClick={likeHandler}>
            <LikeSVG contour='currentColor' color={liked ? 'currentColor' : 'transparent'} />
        </ButtonUI>
        <ButtonUI 
          className={styles['button-share']} 
          type='button' 
          onClick={shareHandler}>
            <ShareSVG color='currentColor' />
        </ButtonUI>
        <ButtonUI 
          className={styles['button-share']} 
          type='button' 
          onClick={() => {}}>
            <MoreSquareSVG color='currentColor' />
        </ButtonUI>
      </div>
      <div className={styles.content}>
        <div className={styles['content-info']}>
          <h2 className={styles.title}>{card.title}</h2>
          <span className={styles.breadcrumbs}>
            <span className={styles.test}>
              {card.filterType}
            </span> / <span>
              {card.subFilterType}
            </span>
          </span>
          <p className={styles.description}>{card.description}</p>
          { edit ? 
            <div className={styles['buttons-container']}>
              <ButtonUI 
                type='button' 
                className={`${styles.button} ${styles['button-edit']}`} 
                onClick={editHandler}
              >Редактировать <EditSVG color={'currentColor'} /></ButtonUI>
              <ButtonUI 
                type='button' 
                className={`${styles.button} ${styles['button-save']}`} 
                onClick={saveHandler}
              >Готово</ButtonUI>
            </div> 
              : 
            <ButtonUI 
              type='button' 
              className={`${styles.button} ${styles['button-trade']}`} 
              onClick={tradeButtonHandler}
            >Предложить обмен</ButtonUI>
            }
        </div>
        {/* Заглушка */}
        <div className={styles['content-gallery']}></div>
      </div>
    </div>
  );
};
