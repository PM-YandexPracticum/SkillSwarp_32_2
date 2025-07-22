import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

export type ProfileFormProps = {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;

  selectedCity: DropdownOption<string> | null;
  setSelectedCity: (city: DropdownOption<string>) => void;
  cities: DropdownOption<string>[];

  mail: string;
  setMail: (mail: string) => void;

  name: string;
  setName: (name: string) => void;

  age: number;
  setAge: (age: number) => void;

  description: string | undefined;
  setDescription: (description: string) => void;
};
