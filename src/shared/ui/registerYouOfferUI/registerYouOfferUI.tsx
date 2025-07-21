import { type FC } from 'react';
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
  skill,
  setSkill,
  offer,
  setOffer,
  description,
  setDescription,
  handleSubmit,
  handleBack
}) => {
  const skills: DropdownOption<string>[] = MAIN_FILTERS_MOCK.flatMap(filter =>
    filter.subFilters.map(subFilter => ({
      id: subFilter.id,
      name: subFilter.title
    }))
  );

  const handleCheckboxes = (id: string) => {
    setSkill((prev) => {
      if (prev.some(item => item.id === id)) {
        return prev.filter(item => item.id !== id);
      };

      const option = skills.find(option => option.id === id);
      if (!option) return prev;
      return [...prev, option];
    });
  };

  const renderSkills = (options: DropdownOption<string>[]) => {
    return options.map((option: DropdownOption<string>) => (
      <li key={option.id}>
        <CheckboxUI
          label={option.name}
          value={option.id}
          checked={skill.some((item) => item.id === option.id)}
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
                isMultiSelect={false} 
                value={skill} 
                placeholder='Выберите'
              >
                {({ filter }) => {
                  const filteredOptions = skills.filter((option) =>
                    option.name.toLowerCase().includes(filter.toLowerCase())
                  );

                  return <>{renderSkills(filteredOptions)}</>;
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
                type='button' 
                onClick={handleBack}
                className={classNames(styles.button, styles.message_btn)}
                >
                Назад
              </ButtonUI>
              <ButtonUI 
                type='submit' 
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

