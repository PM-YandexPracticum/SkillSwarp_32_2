import styles from './radio.module.css';
import type { RadioButtonUIProps } from './type';

// label = текст
// value = уникальный идентификатор
// checked = проверка в родителе, например: checked={selectedRadio === value}
// onChange = колбэк для установки checked из родителя

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
      <span className={`${styles.marker}`} />
      <span className={styles.label}>{label}</span>
    </label>
  );
};
