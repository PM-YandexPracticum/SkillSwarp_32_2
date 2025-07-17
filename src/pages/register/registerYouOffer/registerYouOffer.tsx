import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterYouOfferUI } from '@/shared/ui';
import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';
import store from '@/services/store/store';
import { useDispatch, useSelector } from '@/services/store';
import { clearRegistrationData, postCardThunk, registerUserThunk, selectRegistrationData, setRegistrationStepData } from '@/services/slices';
import type { TMainSkillFilter, TUser } from '@/shared/global-types';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

//дописать взаимодействие и дополнить тип

export const RegisterYouOffer: FC<setStateProps> = ({ setCurrentPage }) => {
  const [category, setCategory] = useState<DropdownOption<string,TMainSkillFilter>[]>([]);
  const [offer, setOffer] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');

  const registrationData = useSelector(selectRegistrationData);

  const dispatch = useDispatch();


  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(setRegistrationStepData({ description, image: file }));

    const { learnSkill, name, age, city, gender, mail, password } = registrationData;

    const userId = self.crypto.randomUUID();
    const cardId = self.crypto.randomUUID();

    if (
      age &&
      name !== '' && 
      gender &&
      city !== '' &&
      Array.isArray(learnSkill)
    ) {

    const userData = {
       gender: gender,
        userId: userId,
        name: name,
        city: city,
        age: age,
        mail: mail,
        password: password,
        description: description,
        incoming: [],
        outgoing: [],
        image: '',
        likes: [],
    };

    const cardData = {
      id: cardId,
      userId: userId,
      teachSkill: [],
      learnSkill: learnSkill,
      name: name as string,
      city: city as string,
      age: age,
      description: description,
      fullDescription: '',
      gender: gender,
      createdAt: Date.now(),
      likes: [],
      src: '',
      skillImages: [],
    };

    dispatch(registerUserThunk(userData as TUser)).then((resultAction) => {
      if (registerUserThunk.fulfilled.match(resultAction)) {
        dispatch(clearRegistrationData());
      } else {
        console.error('Регистрация не удалась');
      }
    });

    dispatch(postCardThunk(cardData));
    
    console.log(store.getState());
    console.log(cardData);

    setCurrentPage((current) => current + 1);
    };
  };
  /*
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
*/
  return (
    <RegisterYouOfferUI
      category={category}
      setCategory={setCategory}
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
