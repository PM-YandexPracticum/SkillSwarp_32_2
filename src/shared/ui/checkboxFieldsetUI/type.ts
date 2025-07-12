import type { OptionProps } from "../checkboxDropdownUI/type";

export type ListType = 'checkbox' | 'dropdown';

export type ListItem = OptionProps; 

export type CheckboxListProps = {
  title: string;
  listType: ListType;
  items: ListItem[];
  selectedItems?: string[];
  onSelect?: (selected: string[]) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
};