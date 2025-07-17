import type { FC, SyntheticEvent /*useEffect,*/ } from 'react';
import { /*useEffect,*/ useState } from 'react';
import { RegisterYouOfferUI } from '@/shared/ui';
import type { setStateProps } from '../type';
//import { useDispatch, useSelector } from '../../services/store';
//import { useLocation, useNavigate } from 'react-router-dom';
import store from '@/services/store/store';
import { useDispatch, useSelector } from '@/services/store';
import { clearRegistrationData, postCardThunk, registerUserThunk, selectRegistrationData, setRegistrationStepData } from '@/services/slices';
import type { TCard, TUser } from '@/shared/global-types';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { makeSkillsArray } from '../helpers';

//дописать взаимодействие и дополнить тип

export const RegisterYouOffer: FC<setStateProps> = ({ setCurrentPage }) => {
  const [offer, setOffer] = useState('');
  const [teachSkill, setTeachSkill] = useState<DropdownOption<string>[]>([]);
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

    const teachSkillsData = makeSkillsArray(teachSkill);
    

    const { learnSkill, name, age, city, gender, mail, password } = registrationData;

    const userId = self.crypto.randomUUID();

     const isValidData =
      age &&
      name &&
      gender &&
      city &&
      Array.isArray(learnSkill);

    if (!isValidData) return;

    const userData = {
      gender,
      userId,
      name,
      city,
      age,
      mail,
      password,
      description,
      incoming: [],
      outgoing: [],
      image: '',
      likes: [],
    };

    const cardData: Omit<TCard, 'id'> = {
      userId,
      teachSkill: teachSkillsData,
      learnSkill,
      name,
      city,
      age,
      description,
      fullDescription: '',
      gender,
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
  
  return (
    <RegisterYouOfferUI
      offer={offer}
      setOffer={setOffer}
      skill={teachSkill}
      setSkill={setTeachSkill}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      file={file}
      setFile={setFile}
      handleBack={handleBack}
    />
  );
};
