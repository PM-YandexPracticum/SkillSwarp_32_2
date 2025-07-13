export type RadioButtonGroupProps = {
  title?: string;
  filters: filtersType[];
  onChangeAction: (selectedValue: filtersType[]) => void;
};

type genderType = null | 'male' | 'female';
export type educationType = null | 'teach' | 'learn';

export type filtersType = {
  title: string
  value: genderType | educationType;
  status: boolean;
};
