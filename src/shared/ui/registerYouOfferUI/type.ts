import type { TMainSkillFilter } from '@/shared/global-types';
import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { DropdownOption } from '../dropdownUI/type';

export type registerYouOfferUIProps =  {
  offer: string;
  setOffer: Dispatch<SetStateAction<string>>;
  category: DropdownOption<string, TMainSkillFilter>[];
  setCategory: Dispatch<SetStateAction<DropdownOption<string,TMainSkillFilter>[]>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
  handleBack: () => void
};
