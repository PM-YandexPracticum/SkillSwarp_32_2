import type { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { RegisterUI } from '@/shared/ui/registerUI';
import type { setStateProps } from '../type';
import store, { useDispatch, useSelector } from '@/services/store/store';
import { useNavigate } from 'react-router-dom';
import { clearErrorMessage, selectError, setError, setRegistrationStepData } from '@/services/slices/userSlice';

export const RegisterMainPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage((current) => current + 1);


    if (!email.trim() || !password.trim()) {
      dispatch(setError('Введите email и пароль'));
      return;
    }

    dispatch(setRegistrationStepData({ mail: email, password }));
    console.log(store.getState());

    navigate('/register/about');
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
 
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
