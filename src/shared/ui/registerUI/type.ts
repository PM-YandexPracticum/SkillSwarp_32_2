import type { SyntheticEvent, Dispatch, SetStateAction } from 'react';

type PageUIProps = {
  errorText: string | undefined;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
};

export type RegisterUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
