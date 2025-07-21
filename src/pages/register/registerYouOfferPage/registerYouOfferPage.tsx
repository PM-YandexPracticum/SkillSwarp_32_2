import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterYouOffer } from '@/widgets/registerYouOffer';
import type { setStateProps } from '../type';
// import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';

//дописать взаимодействие и дополнить тип

export const RegisterYouOfferPage: FC<setStateProps> = ({ setCurrentPage }) => {
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

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
    setCurrentPage((current) => current + 1);
  };
  /*
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
*/
  return (
    <RegisterYouOffer
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
