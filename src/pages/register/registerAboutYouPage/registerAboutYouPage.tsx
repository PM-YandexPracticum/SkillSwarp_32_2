import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterAboutYou } from '@/widgets/registerAboutYou';
// import type { setStateProps } from '../type';
import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';

//дописать взаимодействие и дополнить тип

export const RegisterAboutYouPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  //раскоментить когда будет взаимодействие с апи
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from || { pathname: '/' };

  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage((current) => current + 1);
    /*  const data = { email, password };
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
    <RegisterAboutYou
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
    />
  );
};
