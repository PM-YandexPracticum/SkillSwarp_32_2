import { type FC } from 'react';
import styles from './registerYouOffer.module.css';
import type { registerYouOfferUIProps } from './type';
import { InputUI } from '../inputUI';
import { ButtonUI } from '../buttonUI';
import classNames from 'classnames';
import { DropDrag, ProgressBar } from '@/widgets';
import { HugeTeachingSVG } from '@/assets/svg/huge-teaching';
// import { DropdownUI } from '../dropdownUI';

export const RegisterYouOfferUI: FC<registerYouOfferUIProps> = ({
  offer,
  setOffer,
  // category,
  // setCategory,
  description,
  setDescription,
  handleSubmit
}) => {
  /*
  //для примера дропа, но над переделать скорее всего реаилизацию
  скорее всего тут чекбокс дропдаун
  const options = [
    { name: 'Английский язык', id: '1' },
    { name: 'Русский язык', id: '2' },
    { name: 'Французский язык', id: '3' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<DropdownOption | DropdownOption[]>([]);
*/

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
            <div className={styles.drohdownBlock}>
              <p>Выберите категорию</p>
              {/* <DropdownUI 
                withFilter={true} 
                isMultiSelect={true}
                options={category} 
                value={category}
                placeholder='Выберите категорию навыка'
              >
               {category && (
                ({ filter: currentFilter }) => {
                  const filteredOptions = category.filter((option) =>
                    option.name.toLowerCase().includes(currentFilter.toLowerCase())
                  );

                  return (
                    <>
                      {filteredOptions.map((option) => (
                        <li key={option.id} className='dropdown-item'>
                          <span onClick={() => setCategory(option)}>{option.name}</span>
                        </li>
                      ))}
                    </>
                  );
                })
              }
              </DropdownUI> */}
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
                onClick={()=>{}}
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

