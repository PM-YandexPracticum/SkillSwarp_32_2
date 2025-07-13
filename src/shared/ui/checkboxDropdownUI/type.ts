export type OptionProps = {
  id: string;
  title: string;
};

export type CheckboxDropdownUIProps = {
  label: string;
  options: TSubFilter[];
  selectedOptions: TSubFilter[];
  onSelect: (selected: TSubFilter[]) => void;
  onClose?: () => void;
};

type filterType = 'business' | 'art' | 'languages' | 'education' | 'home' | 'lifestyle' | 'other';

type subFilterType = string;

type filterStatus = 'partial' | 'full' | 'empty';

type cityType = string;

export interface TSubFilter {
  id: string;
  title: string;
  type: subFilterType;
}

export interface TFilter {
  id: string;
  type: filterType;
  title: string;
  status: filterStatus;
  subFilters: TSubFilter[];
}

export interface TCity {
  id: string;
  title: cityType;
}
