export type OptionProps = {
  id: string;
  title: string;
};

export type CheckboxDropdownUIProps = {
  label: string;
  options: OptionProps[];
  selectedOptions: string[];
  onSelect: (selected: string[]) => void;
  onClose?: () => void;
};
