import { useState, type FC } from 'react';
import styles from './registerYouOffer.module.css';
import type { registerYouOfferUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import { DropDrag, ProgressBar } from '@/widgets';
import { HugeTeachingSVG } from '@/assets/svg/huge-teaching';
import { DropdownUI } from '../dropdownUI';
import type { DropdownOption } from '../dropdownUI/type';
import { CheckboxUI } from '../checkboxUI';
import { MAIN_FILTERS_MOCK } from '@/shared/global-types/data-filters-examples';

export const RegisterYouOfferUI: FC<registerYouOfferUIProps> = ({
  offer,
  setOffer,
  //category,
 // setCategory,
  description,
  setDescription,
  handleSubmit
}) => {
  
const options: DropdownOption[] = MAIN_FILTERS_MOCK.map(option => ({
      id: option.id,
      name: option.title,
    }));

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
          <ProgressBar steps={3} current={3}>
          </ProgressBar>
        </div>
        <div className={styles.general}>
          <form
            className={styles.general_column}
            name='youOffer'
            onSubmit={handleSubmit}
          >
            <InputUI
              label='Назовите ваше предложение'
              type='text'
              placeholder='Введите название для вашего предложения'
              onChange={(e) => setOffer(e.target.value)}
              value={offer}
              name='offer'
            />
            <div className={styles.dropdownBlock}>
              <p>Выберите категорию</p>
              <DropdownUI 
                withFilter={true} 
                isMultiSelect={true} 
                value={checkboxes} 
                placeholder='Выберите категорию навыка'
              >
                {({ filter }) => {
                  const filteredOptions = options.filter((option) =>
                    option.name.toLowerCase().includes(filter.toLowerCase())
                  );

                  return <>{renderCheckboxes(filteredOptions)}</>;
                }}
              </DropdownUI>              
            </div>
            <InputUI
              label='Опишите, что вы предлагаете'
              type='textarea'
              placeholder='Здесь можно описать любые значимые подробности, относящиеся к вашему навыку'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name='description'
              rows={2}
            />
            <div className={styles.DropDrag}>
              <DropDrag />
            </div>
            <div className={styles.buttons}>
              <ButtonUI 
                type='link' 
                to='/register/about'
                className={classNames(styles.button, styles.message_btn)}
                >
                Назад
              </ButtonUI>
              <ButtonUI 
                type='button' 
                onClick={()=>{}}
                className={classNames(styles.button, styles.link_btn)}
                >
                Продолжить
              </ButtonUI>
            </div> 
          </form>
          <div className={styles.general_column_img}>
            <div className={styles.img_container}>
              <HugeTeachingSVG width = '150px' height = '150px' />
            </div>
            <div className={styles.text}>
              <h2 className={styles.title}>Укажите, чем вы готовы поделиться</h2>
              <p>Так другие пользователи смогут увидеть ваши предложения и предложить вам обмен!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

