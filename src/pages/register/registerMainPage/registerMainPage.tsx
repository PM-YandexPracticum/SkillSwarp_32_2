import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { RegisterUI } from '@/shared/ui/registerUI';
import type { setStateProps } from '../type';
import { useDispatch, useSelector } from '@/services/store/store';
import {
  checkUserExist,
  selectError,
  setRegistrationStepData,
} from '@/services/slices/userSlice';

export const RegisterMainPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }
    try {
      const result = await dispatch(checkUserExist({ mail: email })).unwrap();
      if (result) {
        console.log('Пользователь уже есть:', result);
      } else {
        dispatch(setRegistrationStepData({ mail: email, password }));
        setCurrentPage((current) => current + 1);
      }
    } catch (error) {
      console.log(error);
    }
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
