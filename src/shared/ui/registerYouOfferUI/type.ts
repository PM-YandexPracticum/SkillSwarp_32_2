import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { DropdownOption } from '../dropdownUI/type';

export type registerYouOfferUIProps =  {
  offer: string;
  setOffer: Dispatch<SetStateAction<string>>;
  skill: DropdownOption<string>[];
  setSkill: Dispatch<SetStateAction<DropdownOption<string>[]>>;
  fullDescription: string;
  setfullDescription: Dispatch<SetStateAction<string>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  handleBack: () => void
};
