import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { RegisterUI } from '@/shared/ui/registerUI';
import type { setStateProps } from '../type';
import store, { useDispatch, useSelector } from '@/services/store/store';
import { selectError, setRegistrationStepData } from '@/services/slices/userSlice';

export const RegisterMainPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      return;
    }

    dispatch(setRegistrationStepData({ mail: email, password }));
    console.log(store.getState());
    setCurrentPage((current) => current + 1);
  };
 
  return (
    <RegisterUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
