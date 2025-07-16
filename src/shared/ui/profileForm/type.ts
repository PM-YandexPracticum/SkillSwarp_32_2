import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

export type ProfileFormProps = {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
  selectedCity: DropdownOption | null;
  setSelectedCity: (city: DropdownOption) => void;
  cities: DropdownOption[];
};
