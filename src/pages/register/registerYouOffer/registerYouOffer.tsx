import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterYouOfferUI } from '@/shared/ui';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';

//дописать взаимодействие и дополнить тип

export const RegisterYouOffer: FC = () => {

  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

  //раскоментить когда будет взаимодействие с апи
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  //const location = useLocation();
  //const from = location.state?.from || { pathname: '/' };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
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
      />
  );
};
