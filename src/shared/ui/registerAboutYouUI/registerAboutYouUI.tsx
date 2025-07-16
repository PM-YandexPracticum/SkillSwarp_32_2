import { useState, type FC } from 'react';

import styles from './registerAboutYou.module.css';
import type { registerAboutYouUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import { ProgressBar } from '@/widgets';

import { UserCircleSVG } from '@/assets/svg/user-circle';
import { PlusCircleSVG } from '@/assets/svg/plus-circle';
import { HugeUserAccountSVG } from '@/assets/svg/huge-user-account';
import type { DropdownOption } from '../dropdownUI/type';
import { DropdownUI } from '../dropdownUI';
import { CheckboxUI } from '../checkboxUI';
import { CITIES_MOCK } from '@/shared/global-types/data-cities-examples';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';

export const RegisterAboutYouUI: FC<registerAboutYouUIProps> = ({
  name,
  setName,
  //gender,
  //setGender,
  //age,
  //setAge,
  //city,
  //setCity,
  //skill,
  //setSkill,
  handleSubmit
}) => {
  
  const ages: DropdownOption[] = [
    {id: '16', name: '16'},
    {id: '17', name: '17'},
    {id: '18', name: '18'},
    {id: '19', name: '19'},
    {id: '20', name: '20'},
    {id: '21', name: '21'},
    {id: '22', name: '22'},
    {id: '23', name: '23'},
    {id: '24', name: '24'},
    {id: '25', name: '25'},
    {id: '26', name: '26'},
    {id: '27', name: '27'},
    {id: '28', name: '28'},
    {id: '29', name: '29'},
    {id: '30', name: '30'},
    {id: '31', name: '31'},
    {id: '32', name: '32'},
    {id: '33', name: '33'},
    {id: '34', name: '34'},
    {id: '35', name: '35'},
    {id: '36', name: '36'},
    {id: '37', name: '37'},
    {id: '38', name: '38'},
    {id: '39', name: '39'},
    {id: '40', name: '40'},
    {id: '41', name: '41'},
    {id: '42', name: '42'},
    {id: '43', name: '43'},
    {id: '44', name: '44'},
    {id: '45', name: '45'},
  ];

  const [age, setAge] = useState<DropdownOption>({id: '', name: ''});

  const renderAgeOptions = () => {
    return ages.map(age => (
      <li key={age.id} onClick={() => setAge(age)}>
        {age.name}
      </li>
    ));
  };

 const genders: DropdownOption[] = [
    {id: 'male', name: 'Мужской'},
    {id: 'female', name: 'Женский'},
    {id: 'unknown', name: 'Не указан'}
  ];

  const [gender, setGender] = useState<DropdownOption>({id: '', name: ''});

  const renderGenderOptions = () => {
    return genders.map(gender => (
      <li key={gender.id} onClick={() => setGender(gender)}>
        {gender.name}
      </li>
    ));
  };

   const cities: DropdownOption[] = CITIES_MOCK.map(city => ({
      id: city.id,
      name: city.title,
    }));

  const [city, setCity] = useState<DropdownOption>({id: '', name: ''});

  const renderCityOptions = (filteredCities: DropdownOption[]) => {
    return filteredCities.map(city => (
      <li key={city.id} onClick={() => setCity(city)}>
        {city.name}
      </li>
    ));
  };

  const options: DropdownOption[] = MAIN_FILTERS_MOCK.flatMap(filter =>
      filter.subFilters.map(subFilter => ({
        id: subFilter.id,
        name: subFilter.title
      }))
    );

  const [checkboxes, setCheckboxes] = useState<DropdownOption[]>([]);

  const handleCheckboxes = (id: string) => {
      setCheckboxes((prev) => {
        if (prev.some(item => item.id === id)) {
          return prev.filter(item => item.id !== id);
        };

        const option = options.find(option => option.id === id);
        if (!option) return prev;
        return [...prev, option];
      });
    };

  const renderCheckboxes = (options: DropdownOption[]) => {
    return options.map((option: DropdownOption) => (
      <li key={option.id}>
        <CheckboxUI
          label={option.name}
          value={option.id}
          checked={checkboxes.some((item) => item.id === option.id)}
          onChange={() => handleCheckboxes(option.id)}
        />
      </li>
      )
    );
  };
  
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.ProgressBar}>
          <ProgressBar steps={3} current={2}>
          </ProgressBar>
        </div>
        <div className={styles.general}>
          <form
            className={styles.general_column}
            name='aboutYou'
            onSubmit={handleSubmit}
          >
          <div className={styles.img_profile}>
            <UserCircleSVG size='60px'/>
            <div className={styles.img_Plus}>
              <PlusCircleSVG size='24px' />
            </div>
          </div> 
            <InputUI
              label='Имя'
              type='text'
              placeholder='Введите ваше имя'
              onChange={(e) => setName(e.target.value)}
              value={name}
              name='name'
              error={false}
              errorText=''
            />
            <div className={styles.gentwo}>              
              <div className={styles.dropdownBlock}>
                <p>Возраст</p>
                <DropdownUI 
                    withFilter={false} 
                    isMultiSelect={false} 
                    value={age} 
                    placeholder='Не указан'
                  >
                  {() => renderAgeOptions()}
                </DropdownUI>
              </div>
              <div className={styles.dropdownBlock}>
                <p>Пол</p>
                <DropdownUI 
                    withFilter={false} 
                    isMultiSelect={false} 
                    value={gender} 
                    placeholder='Не указан'
                  >
                  {() => renderGenderOptions()}
                </DropdownUI>
              </div>
            </div>
            <div className={styles.dropdownBlock}>
              <p>Выберите навыки, которым хотите научиться</p>
              <DropdownUI 
                withFilter={true} 
                isMultiSelect={true} 
                value={checkboxes} 
                placeholder='Выберите'
              >
                {({ filter }) => {
                  const filteredOptions = options.filter((option) =>
                    option.name.toLowerCase().includes(filter.toLowerCase())
                  );

                  return <>{renderCheckboxes(filteredOptions)}</>;
                }}
                </DropdownUI>
            </div>
            <div className={styles.dropdownBlock}>
              <p>Город</p>
              <DropdownUI 
                withFilter={true} 
                isMultiSelect={false} 
                value={city}
                placeholder='Выберите ваш город'
              >
                {({ filter }) => {
                  const filteredOptions = cities.filter((city) =>
                    city.name.toLowerCase().includes(filter.toLowerCase())
                  );

                  return <>{renderCityOptions(filteredOptions)}</>;
                }}
              </DropdownUI>
            </div>
            <div className={styles.buttons}>
              <ButtonUI 
                type='link' 
                to='/register'
                className={classNames(styles.button, styles.message_btn)}
                >
                Назад
              </ButtonUI>
              <ButtonUI 
                type='link' 
                to='/register/offer'
                className={classNames(styles.button, styles.link_btn)}
                >
                Продолжить
              </ButtonUI>
            </div> 
          </form>
          <div className={styles.general_column_img}>
            <div className={styles.img_container}>
              <HugeUserAccountSVG width = '150px' height = '150px' />
            </div>
            <div className={styles.text}>
              <h2 className={styles.title}>Расскажите немного о себе</h2>
              <p>Это поможет другим пользователям лучше вас узнать, чтобы выбрать для обмена</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

