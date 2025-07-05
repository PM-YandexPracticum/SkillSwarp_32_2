import styles from './radio.module.css';

type RadioButtonProps = {
  label: string;
  id: string;
  onChange: (value: string) => void;
}

export const RadioButton = ({label, id, onChange}: RadioButtonProps) => {
  return (
    <label key={id} className={styles.label}>
      <input
        checked={}
        type='radio'
        id={id}
        value={label}
        onChange={() => onChange(label)}
        className={`visually-hidden ${styles.radio}`}
      />
      <span className={styles.flag} />
      <span className={styles.label}>{label}</span>
    </label>
  )
}