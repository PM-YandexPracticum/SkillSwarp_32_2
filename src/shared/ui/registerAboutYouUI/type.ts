import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { DropdownOption } from '../dropdownUI/type';
import type { genderType } from '@/shared/global-types';
//import type { DropdownOption } from '../dropdownUI/type';

export type registerAboutYouUIProps =  {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  gender: DropdownOption<genderType>;
  setGender: Dispatch<SetStateAction<DropdownOption<genderType>>>;
  age: DropdownOption<number | undefined>;
  setAge: Dispatch<SetStateAction<DropdownOption<number | undefined>>>;
  city: DropdownOption<string>;
  setCity: Dispatch<SetStateAction<DropdownOption<string>>>;
  skill: DropdownOption<string>[];
  setSkill: Dispatch<SetStateAction<DropdownOption<string>[]>>;
  handleSubmit: (e: SyntheticEvent) => void;
  handleBack: () => void;
};
