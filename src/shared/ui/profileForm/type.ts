import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

export type ProfileFormProps = {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
  selectedCity: DropdownOption<string> | null;
  setSelectedCity: (city: DropdownOption<string>) => void;
  cities: DropdownOption<string>[];
};
