import { useState, 
    type ChangeEvent, 
    type DragEvent, 
    type FC 
} from 'react';
import styles from './drop-drag.module.css'; 

//надо доработать цвета изображений
import { GalleryAddSVG } from '@/assets/svg/gallery_add';
import { GalleryEditSVG } from '@/assets/svg/gallery_edit';

export const DropDrag: FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files[0]) {
            setFiles(e.target.files);
        };
    };

    const handleDrag = (e: DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleLeave = (e: DragEvent<HTMLFormElement>)  => {
        e.preventDefault();
        setDragActive(false);
    };
    
    const handleDrop = (e: DragEvent<HTMLFormElement>)  => {
        e.preventDefault();
        setDragActive(false);
        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles(e.dataTransfer.files);
        };
    };
    
    const handleReset = (e: DragEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFiles(null);
    };

    const hasFile = (files && files.length > 0);

    //временно добавила крестик
    const ResetGallery = () => (
        <svg width='24' height='24' viewBox='0 0 24 24' fill='#abd27a' xmlns='http://www.w3.org/2000/svg'>
            <path d='M16.7403 8.28723L8.25505 16.7725C7.96514 17.0624 7.48431 17.0624 7.19439 16.7725C6.90448 16.4826 6.90448 16.0018 7.19439 15.7119L15.6797 7.22657C15.9696 6.93666 16.4504 6.93666 16.7403 7.22657C17.0302 7.51649 17.0302 7.99732 16.7403 8.28723Z' fill='#253017' />
            <path d='M16.7403 16.7724C16.4504 17.0624 15.9696 17.0624 15.6797 16.7724L7.19439 8.28717C6.90448 7.99725 6.90448 7.51642 7.19439 7.22651C7.48431 6.93659 7.96514 6.93659 8.25505 7.22651L16.7403 15.7118C17.0302 16.0017 17.0302 16.4825 16.7403 16.7724Z' fill='#253017' />
        </svg>
    );

    return (
        <div className={`${styles.drap_drag} ${dragActive ? styles.drap_drag__active :''}`}>
            <form className={styles.drap_drag__form}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleLeave}
                onDrop={handleDrop}
                onReset={handleReset}
            >
                {hasFile ? (
                    <div className={styles.drap_drag__gallery}>
                        <label className={styles.drap_drag__gallery_edit}>
                            <GalleryEditSVG width='24px' height='24px'/>
                            <input type='file'
                                className={styles.drap_drag__input}
                                multiple
                                onChange={handleChange}          
                            />   
                        </label>
                        <label className={styles.drap_drag__gallery_edit}>
                            <ResetGallery />
                            <input type='reset'
                                className={styles.drap_drag__input}
                                multiple
                                onChange={handleChange}          
                            />
                        </label>
                    </div>                
                    ) : (
                    <div className={styles.drap_drag__form}>
                        <h1 className={styles.drap_drag__text}>
                            Перетащите или выберите изображения навыка
                        </h1>
                        <label className={styles.drap_drag__label}>
                            <div className={styles.drap_drag__view}>
                                <GalleryAddSVG width='24px' height='24px'/>                                           
                                <p className={styles.drap_drag__link}>Выбрать изображения</p>
                            </div>               
                            <input type='file'
                                className={styles.drap_drag__input}
                                multiple
                                onChange={handleChange}          
                                />                   
                        </label>
                    </div>
                    )
                }
                {hasFile
                    &&
                    <ul className={styles.drap_drag__file_list}>
                        {Array.from(files).map((file, id) => <li key={id}>{file.name}</li>)}
                    </ul>
                }            
            </form>
        </div>
    );
};
