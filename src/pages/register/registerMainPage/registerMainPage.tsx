import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterUI } from '@/shared/ui/registerUI';
import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';

//дописать взаимодействие и дополнить тип

export const RegisterMainPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //раскоментить когда будет взаимодействие с апи
  //const dispatch = useDispatch();
  const error = ''; //useSelector(selectError);
  //const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from || { pathname: '/' };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage((current) => current + 1);
    /*  const data = { email, password };

    dispatch(fetchLoginUser(data)).then(() => {
      navigate(from);
    });
    */
  };
  /*
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
*/
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
