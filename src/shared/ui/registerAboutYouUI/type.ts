import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { DropdownOption } from '../dropdownUI/type';
//import type { DropdownOption } from '../dropdownUI/type';

export type registerAboutYouUIProps =  {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  gender: DropdownOption;
  setGender: Dispatch<SetStateAction<DropdownOption>>;
  age: DropdownOption;
  setAge: Dispatch<SetStateAction<DropdownOption>>;
  city: DropdownOption;
  setCity: Dispatch<SetStateAction<DropdownOption>>;
  skill: DropdownOption[];
  setSkill: Dispatch<SetStateAction<DropdownOption[]>>;
  handleSubmit: (e: SyntheticEvent) => void;
  handleBack: () => void;
};
