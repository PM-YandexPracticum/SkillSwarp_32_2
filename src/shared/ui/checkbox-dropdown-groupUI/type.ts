export type CheckBoxGroupProps = {
  title: string;
  filters: TFilter[];
  onChange:(selectedValues: TSubFilter[]) => void;
}
export type filterType = 'business' | 'art' | 'languages' | 'education' | 'home' | 'lifestyle' | 'other';

export type subFilterType = string;

export interface TSubFilter {
  id: string
  title: string
  type: subFilterType
}

export interface TFilter {
  id: string
  type: filterType
  title: string
  subFilters: TSubFilter[]
}
