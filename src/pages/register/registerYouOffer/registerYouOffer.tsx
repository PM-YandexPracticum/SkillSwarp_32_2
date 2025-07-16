import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterYouOfferUI } from '@/shared/ui';
<<<<<<< HEAD
import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';
=======
import store from '@/services/store/store';
import { useDispatch, useSelector } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { clearRegistrationData, registerUserThunk, selectRegistrationData, setRegistrationStepData } from '@/services/slices';
import type { TUser } from '@/shared/global-types';
>>>>>>> 48b38c2 (working on registration pages. Registration works. Adding form fields into the registrationData)

//дописать взаимодействие и дополнить тип

export const RegisterYouOffer: FC<setStateProps> = ({ setCurrentPage }) => {
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

  const registrationData = useSelector(selectRegistrationData);

  //раскоментить когда будет взаимодействие с апи
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from || { pathname: '/' };

  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setCurrentPage((current) => current + 1);
=======

    dispatch(setRegistrationStepData({ description, image: file }));

    const completeRegistrationData = {
      ...registrationData,
      description,
      image: file,
    } as TUser;
    console.log(store.getState());

    dispatch(registerUserThunk(completeRegistrationData)).then((resultAction) => {
      if (registerUserThunk.fulfilled.match(resultAction)) {
        dispatch(clearRegistrationData());
        navigate('/');
      } else {
        console.error('Регистрация не удалась');
      }
    });


>>>>>>> 48b38c2 (working on registration pages. Registration works. Adding form fields into the registrationData)
  };
  /*
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
*/
  return (
    <RegisterYouOfferUI
      offer={offer}
      setOffer={setOffer}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      file={file}
      setFile={setFile}
      handleBack={handleBack}
    />
  );
};
