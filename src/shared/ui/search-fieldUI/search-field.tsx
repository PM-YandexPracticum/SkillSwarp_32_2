import { ButtonUI } from '../buttonUI';
import styles from './search-field.module.css';
export const SearchFieldUI = () => {
  const resetSearchField = () => {/* Здесь будет функция очистки поля */}
  return (
    /* Пока что строка поиска находится в div со свойcтвом display: flex, но потом это свойство должно быть у хедера, 
       а div можно будет убрать */
    <div className={styles.div}>
      <label className={styles.input_wrapper}>
        <svg
          className={styles.search_icon}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path
            fill='#69735D' // Заменить на переменную цвета
            d='M11.535 21.07C6.279 21.07 2 16.79 2 11.535 2 6.279 6.28 2 11.535 2c5.256 0 9.535 4.28 9.535 9.535 0 5.256-4.28 9.535-9.535 9.535m0-17.675c-4.493 0-8.14 3.656-8.14 8.14s3.647 8.14 8.14 8.14 8.14-3.656 8.14-8.14-3.647-8.14-8.14-8.14M21.302 22a.7.7 0 0 1-.493-.205l-1.86-1.86a.7.7 0 0 1 0-.986c.27-.27.716-.27.986 0l1.86 1.86c.27.27.27.717 0 .986a.7.7 0 0 1-.493.205'
          />
        </svg>
        <input className={styles.input} type='text' placeholder='Искать навык' />

        {/* Крестик должен будет появляться, когда в поле есть текст, пока что он тут постоянно */}

        <ButtonUI type='button' onClick={resetSearchField} className={styles.clear_button}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path
              fill='#253017' // Заменить на переменную цвета
              d='m16.744 8.288-8.486 8.485c-.29.29-.77.29-1.06 0a.756.756 0 0 1 0-1.06l8.485-8.486c.29-.29.77-.29 1.06 0s.29.77 0 1.06'
            />
            <path
              fill='#253017' // Заменить на переменную цвета
              d='M16.744 16.773a.754.754 0 0 1-1.06 0L7.197 8.288a.755.755 0 0 1 0-1.061c.29-.29.77-.29 1.06 0l8.486 8.485c.29.29.29.77 0 1.06'
            />
          </svg>
        </ButtonUI>
      </label>
    </div>
  );
};
