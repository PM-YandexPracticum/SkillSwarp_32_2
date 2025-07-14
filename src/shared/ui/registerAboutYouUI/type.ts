import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
//import type { DropdownOption } from '../dropdownUI/type';

export type registerAboutYouUIProps =  {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  gender: string;//DropdownOption[];
  setGender: Dispatch<SetStateAction<string>>;
  age: string;
  setAge: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  skill: string;
  setSkill: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
