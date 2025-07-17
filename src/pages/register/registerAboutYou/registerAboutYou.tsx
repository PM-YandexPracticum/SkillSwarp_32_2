import type { FC, SyntheticEvent } from 'react';
import { useState } from 'react';
import { RegisterAboutYouUI } from '@/shared/ui';
// import type { setStateProps } from '../type';
import type { setStateProps } from '../type';
import { setRegistrationStepData } from '@/services/slices/userSlice';
import store, { useDispatch } from '@/services/store/store';
import type { genderType } from '@/shared/global-types';
// import { useNavigate } from 'react-router-dom';
import type { DropdownOption } from '@/shared/ui/dropdownUI/type';
import { makeSkillsArray } from '../helpers';

export const RegisterAboutYou: FC<setStateProps> = ({ setCurrentPage }) => {
  const [name, setName] = useState(''); 
  const [age, setAge] = useState<DropdownOption<number | undefined>>({ id: undefined , name: '' });
  const [gender, setGender] = useState<DropdownOption<genderType>>({ id: 'female', name: '' });
  const [city, setCity] = useState<DropdownOption<string>>({ id: '', name: '' });
  const [learnSkills, setLearnSkills] = useState<DropdownOption<string>[]>([]);

  const dispatch = useDispatch();

  const handleBack = () => {
    setCurrentPage((current) => current - 1);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const learnSkillsData = makeSkillsArray(learnSkills);

    if (
      age.id &&
      name.trim() !== '' &&
      gender.id &&
      city.name.trim() !== '' &&
      learnSkills.length > 0
    ) {
      const data = {
        name,
        age: age.id,
        gender: gender.id,
        city: city.name,
        learnSkill: learnSkillsData
      };

      dispatch(setRegistrationStepData(data));
      console.log(store.getState());
      setCurrentPage((current) => current + 1);
    }
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
      skill = {learnSkills}
      setSkill = {setLearnSkills}
      handleSubmit={handleSubmit}
      handleBack={handleBack} />
  );
};
