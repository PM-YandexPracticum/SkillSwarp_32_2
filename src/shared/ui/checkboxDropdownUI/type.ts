export type CheckboxDropdownUIProps = {
  label: string;
  options: string[];
  selectedOptions: string[];
  onSelect: (selected: string[]) => void;
  onClose?: () => void;
};
