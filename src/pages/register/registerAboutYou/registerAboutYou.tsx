import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { RegisterAboutYouUI } from '@/shared/ui';
// import type { setStateProps } from '../type';
import type { setStateProps } from '../type';
import { setRegistrationStepData } from '@/services/slices/userSlice';
import store, { useDispatch } from '@/services/store/store';
import type { genderType } from '@/shared/global-types';
import { useNavigate } from 'react-router-dom';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';

export const RegisterAboutYou: FC<setStateProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState(''); 
  const [age, setAge] = useState<DropdownOption<number | undefined>>({ id: undefined , name: '' });
  const [gender, setGender] = useState<DropdownOption<genderType>>({ id: 'female', name: '' });
  const [city, setCity] = useState<DropdownOption<string>>({ id: '', name: '' });
  const [skills, setSkills] = useState<DropdownOption<string>[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //const from = location.state?.from || { pathname: '/' };

  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage((current) => current + 1);

    const data = {
      name,
      age: age.id,
      gender: gender.id,
      city: city.name,
      skills: skills
    };

    dispatch(setRegistrationStepData(data));
    console.log(store.getState());
    navigate('/register/offer');
  };
  /*
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, []);
*/
  return (
    <RegisterAboutYouUI
      name = {name}
      setName = {setName}
      gender = {gender}
      setGender = {setGender}
      age = {age}
      setAge = {setAge}
      city = {city}
      setCity = {setCity}
      skill = {skills}
      setSkill = {setSkills}
      handleSubmit={handleSubmit}
      handleBack={handleBack} />
  );
};
