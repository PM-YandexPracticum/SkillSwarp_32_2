import { type FC } from 'react';
import styles from './skillImageGallery.module.css';
import type { SkillImageGalleryUIProps } from './types';

export const SkillImageGalleryUI: FC<SkillImageGalleryUIProps> = ({ images}) => {
  const maxImages = 4;
  const visibleImages = images.slice(0, maxImages);
  const remainingCount = images.length - maxImages;

  return (
    <div className={styles.image_grid}>
      {visibleImages.map((image, index) => (
        <img
          key={index}
          src={image.link}
          alt={`Image ${index + 1}`}
          className={index === maxImages - 1 && remainingCount > 0 ? styles.blurred : ''}
        />
      ))}
      {remainingCount > 0 && (
        <div className={styles.remaining_count}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
