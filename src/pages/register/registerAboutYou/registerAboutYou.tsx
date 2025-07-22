import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { RegisterAboutYouUI } from '@/shared/ui';
// import type { setStateProps } from '../type';
import type { setStateProps } from '../type';
import { setRegistrationStepData } from '@/services/slices/userSlice';
import store, { useDispatch } from '@/services/store/store';
import type { genderType } from '@/shared/global-types';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { makeSkillsArray } from '../helpers';

export const RegisterAboutYou: FC<setStateProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState(''); 
  const [age, setAge] = useState<DropdownOption<number | undefined>>({ id: undefined , name: '' });
  const [gender, setGender] = useState<DropdownOption<genderType>>({ id: 'female', name: '' });
  const [city, setCity] = useState<DropdownOption<string>>({ id: '', name: '' });
  const [learnSkills, setLearnSkills] = useState<DropdownOption<string>[]>([]);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setRegistrationStepData({ description}));
    const learnSkillsData = makeSkillsArray(learnSkills);

    const isValid =
      name.trim() !== '' &&
      typeof age.id === 'number' &&
      gender.id !== null &&
      city.name.trim() !== '' &&
      learnSkillsData.length > 0;

    if (!isValid) return;
    
    const data = {
      name,
      age: age.id,
      gender: gender.id,
      city: city.name,
      learnSkill: learnSkillsData,
      description
    };

    dispatch(setRegistrationStepData(data));
    setCurrentPage((current) => current + 1);
    // console.log(store.getState());
  };

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
      skill = {learnSkills}
      setSkill = {setLearnSkills}
      description={description}
      setDescription={setDescription}
      handleSubmit={handleSubmit}
      handleBack={handleBack} />
  );
};
