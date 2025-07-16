import type { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { LoginUI } from '@/shared/ui/loginUI';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearErrorMessage, loginUserThunk, selectError, setError } from '@/services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      dispatch(setError('Введите email и пароль'));
      return;
    }

    const data = { email, password };

    dispatch(loginUserThunk(data))
      .then((action) => {
        if (loginUserThunk.fulfilled.match(action)) {
          navigate(from);
        }
      });
  };

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
