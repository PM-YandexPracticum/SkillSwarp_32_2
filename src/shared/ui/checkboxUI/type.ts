export type CheckboxUIProps = {
  label: string;
  value: string; 
  checked: boolean;
  ariaChecked?: 'true' | 'false' | 'mixed';
  onChange: (value: string) => void;
};
