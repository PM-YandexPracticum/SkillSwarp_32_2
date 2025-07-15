import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type registerYouOfferUIProps =  {
  offer: string;
  setOffer: Dispatch<SetStateAction<string>>;
  //category: DropdownOption[];
  //setCategory: Dispatch<SetStateAction<DropdownOption | DropdownOption[]>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  file: string;
  setFile: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};
