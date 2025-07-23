// src/shared/ui/photoUploadUI/photo-upload.tsx
import React, { useState, useRef, type FC } from 'react';
import { ButtonUI } from '../buttonUI';
import { EditSVG, CrossSVG } from '@/assets/svg';
import styles from './photo-upload.module.css';

interface PhotoUploadUIProps {
  currentPhoto?: string;
  onPhotoChange: (photo: string | null) => void;
  disabled?: boolean;
  maxSizeInMB?: number;
}

export const PhotoUploadUI: FC<PhotoUploadUIProps> = ({
  currentPhoto,
  onPhotoChange,
  disabled = false,
  maxSizeInMB = 5,
}) => {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsLoading(true);

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      setIsLoading(false);
      return;
    }

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`Размер файла не должен превышать ${maxSizeInMB}MB`);
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onPhotoChange(result);
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError('Ошибка при загрузке файла');
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onPhotoChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.preview_container}>
        {preview ? (
          <div className={styles.preview_wrapper}>
            <img src={preview} className={styles.preview_image} />
            <ButtonUI
              type='button'
              onClick={handleRemovePhoto}
              className={styles.remove_button}
              disabled={disabled || isLoading}
              aria-label='Удалить фото'
            >
              <CrossSVG />
            </ButtonUI>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholder_text}>Фото профиля</span>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileSelect}
        className={styles.hidden_input}
        disabled={disabled || isLoading}
      />

      <ButtonUI
        type='button'
        onClick={handleButtonClick}
        className={styles.upload_button}
        disabled={disabled || isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Изменить фото'}
        <span className={styles.icon}>
          <EditSVG />
        </span>
      </ButtonUI>

      {error && (
        <div className={styles.error_message}>
          {error}
        </div>
      )}

      <div className={styles.hint}>
        Рекомендуемый размер: 400x400px
        <br />
        Форматы: JPG, PNG, максимум {maxSizeInMB}MB
      </div>
    </div>
  );
};
