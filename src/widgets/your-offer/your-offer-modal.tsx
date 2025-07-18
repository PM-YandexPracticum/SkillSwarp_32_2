import React from 'react';
import styles from './your-offer-modal.module.css';
import { SkillImageGalleryUI } from '../../shared/ui/skill-image-galleryUI';
import { ButtonUI } from '../../shared/ui/buttonUI';
import type { TImage } from '@/shared/global-types';
import EditIcon from '../../assets/svg/edit/edit.svg';

interface YourOfferModalProps {
  images: TImage[];
  setCurrentPage: (page: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const YourOfferModal: React.FC<YourOfferModalProps> = ({
  images,
  setCurrentPage,
  onSubmit,
  onClose,
}) => {
  const handleEdit = () => {
    setCurrentPage(3); // шаг с редактированием предложения
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose} aria-label='Закрыть модальное окно'>×</button>
        <div className={styles.header}>
          <h2 className={styles.title}>Ваше предложение</h2>
          <p className={styles.subtitle}>Пожалуйста проверьте и подтвердите правильность данных</p>
        </div>
        <div className={styles.cardBig}>
          <div className={styles.cardUser}>
            <div className={styles.cardUserText}>
              <div className={styles.category}>Творчество и искусство / Музыка и звук</div>
              <div className={styles.mainTitle}>Игра на барабанах</div>
              <div className={styles.description}>
                <p>Привет! Я играю на барабанах уже больше 10 лет — от репетиций<br/>
                в гараже до выступлений на сцене с живыми группами. </p>

                <p>Научу:<br/>
                основам техники (и как не отбить себе пальцы)<br/>
                играть любимые ритмы и разбирать песни<br/>
                импровизировать и звучать уверенно даже без партитуры</p>

                <p>Будет шумно, весело и ритмично. Даже если у тебя пока только<br/>
                 кастрюли и две ложки — с этого тоже начинали лучшие.</p>
              </div>
            </div>
            <div className={styles.contentGallery}>
              <SkillImageGalleryUI images={images} />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
        <ButtonUI type='button' className={`${styles.buttonBase} ${styles['secondary-btn']}`} onClick={handleEdit}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                Редактировать
                <span style={{ width: 8 }} />
                <img src={EditIcon} width={25} height={24} alt='Редактировать' />
            </span>
        </ButtonUI>
        <ButtonUI type='button' className={`${styles.buttonBase} ${styles['primary-btn']}`} onClick={onSubmit}>Готово</ButtonUI>
        </div>
      </div>
    </div>
  );
};

export default YourOfferModal; 
