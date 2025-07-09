import styles from './radio.module.css';
import type { RadioButtonUIProps } from './type';

const InactiveRadio = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 22C6.484 22 2 17.516 2 12S6.484 2 12 2s10 4.484 10 10-4.484 10-10 10zm0-18.605c-4.744 0-8.605 3.86-8.605 8.605 0 4.744 3.86 8.605 8.605 8.605 4.744 0 8.605-3.86 8.605-8.605 0-4.744-3.86-8.605-8.605-8.605z' fill='currentColor'/>
  </svg>
);

// Тут надо ждать переменные, пока вписал свою переменную в css
// Далее нужно будет заменить на актуальную
const ActiveRadio = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
    <path d='M12 22C6.484 22 2 17.516 2 12S6.484 2 12 2s10 4.484 10 10-4.484 10-10 10zm0-18.605c-4.744 0-8.605 3.86-8.605 8.605 0 4.744 3.86 8.605 8.605 8.605 4.744 0 8.605-3.86 8.605-8.605 0-4.744-3.86-8.605-8.605-8.605z'  style={{fill: 'var(--button-pressed-color)'}} />
    <circle cx='12' cy='12' r='5' style={{fill: 'var(--button-pressed-color)'}} />
  </svg>
);

// label = текст
// value = уникальный идентификатор
// checked = проверка в родителе, например: checked={selectedRadio === value}
// onChange = колбэк для установки checked
export const RadioButtonUI = ({label, value, checked, onChange}: RadioButtonUIProps) => {
  return (
    <label className={styles.label}>
      <input
        checked={checked}
        type='radio'
        value={value}
        onChange={() => onChange(value)}
        className={styles.hidden}
      />
      {checked ? <ActiveRadio /> : <InactiveRadio />}
      <span className={styles.text}>{label}</span>
    </label>
  );
};
