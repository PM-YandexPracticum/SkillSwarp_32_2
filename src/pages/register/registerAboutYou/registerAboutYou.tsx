import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterAboutYouUI } from '@/shared/ui';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';

//дописать взаимодействие и дополнить тип

export const RegisterAboutYou: FC = () => {

  const [name, setName] = useState('');
  //раскоментить когда будет взаимодействие с апи
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from || { pathname: '/' };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
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
    <RegisterAboutYouUI
      name= {name}
      setName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
