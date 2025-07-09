import styles from './checkbox.module.css';
import type { CheckboxUIProps } from './type';

const InactiveCheckbox = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='none'>
    <path
      fill='currentColor'
      d='M12.79 20H7.21C2.157 20 0 17.842 0 12.79V7.21C0 2.157 2.158 0 7.21 0h5.58C17.843 0 20 2.158 20 7.21v5.58c0 5.052-2.158 7.21-7.21 7.21ZM7.21 1.395c-4.29 0-5.815 1.526-5.815 5.814v5.582c0 4.288 1.526 5.814 5.814 5.814h5.582c4.288 0 5.814-1.526 5.814-5.814V7.209c0-4.288-1.526-5.814-5.814-5.814H7.209Z'
    />
  </svg>
);

// Заменить значение fill на переменную по готовности
const ActiveCheckbox = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
    <path
      fill='#ABD27A'
      d='M12.791 0C17.841 0 20 2.158 20 7.209v5.582C20 17.841 17.842 20 12.791 20H7.209C2.159 20 0 17.842 0 12.791V7.209C0 2.159 2.158 0 7.209 0h5.582Zm1.99 6.63a.755.755 0 0 0-1.061 0l-5.14 5.14-2.3-2.3a.755.755 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2.83 2.83a.75.75 0 0 0 1.06 0l5.67-5.67c.29-.29.29-.77 0-1.06Z'
    />
  </svg>
);

const PartialCheckbox = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
    <path
      fill='#ABD27A'
      d='M12.791 0C17.841 0 20 2.158 20 7.209v5.582C20 17.841 17.842 20 12.791 20H7.209C2.159 20 0 17.842 0 12.791V7.209C0 2.159 2.158 0 7.209 0h5.582ZM6 9.25c-.41 0-.75.34-.75.75s.34.75.75.75h8c.41 0 .75-.34.75-.75s-.34-.75-.75-.75H6Z'
    />
  </svg>
);

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
        <ActiveCheckbox />
      ) : ariaChecked === 'mixed' ? (
        <PartialCheckbox />
      ) : (
        <InactiveCheckbox />
      )}
      <span className={styles.text}>{label}</span>
    </label>
  );
};
