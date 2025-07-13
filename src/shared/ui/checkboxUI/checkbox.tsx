import { CheckboxDoneSVG, CheckboxEmptySVG, CheckboxRemoveSVG } from '@/assets/svg';
import styles from './checkbox.module.css';
import type { CheckboxUIProps } from './type';

export const CheckboxUI = ({
  label,
  value,
  checked,
  ariaChecked = 'false',
  onChange,
  ...rest
}: CheckboxUIProps) => {
  return (
    <label className={styles.label}>
      <input
        checked={checked}
        type='checkbox'
        aria-checked={ariaChecked}
        id={value}
        value={value}
        onChange={() => onChange(value)}
        className={styles.hidden}
        {...rest}
      />
      {checked ? (
        <CheckboxDoneSVG color='var(--accent-redesigned)'/>
      ) : ariaChecked === 'mixed' ? (
        <CheckboxRemoveSVG color='var(--accent-redesigned)'/>
      ) : (
        <CheckboxEmptySVG color='currentColor'/>
      )}
      <span className={styles.text}>{label}</span>
    </label>
  );
};
