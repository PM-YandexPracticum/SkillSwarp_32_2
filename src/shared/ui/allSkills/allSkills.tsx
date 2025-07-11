import type { FC } from 'react';
import styles from './allSkills.module.css';
import { ButtonUI } from '../buttonUI';
import { BookSVG } from '@/assets/svg';
import type { SVGType } from '@/assets/svg/svg.type';

export const AllSkills: FC = () => {
  const categories = [
    {
      skillsGroup: 'Бизнес и карьера',
      className: 'bissnes',
      skills: [
        'Управление командой',
        'Маркетинг и реклама',
        'Продажи и переговоры',
        'Личный бренд',
        'Резюме и собеседование',
        'Тайм-менеджмент',
        'Проектное управление',
        'Предпринимательство',
      ],
    },
    {
      skillsGroup: 'Творчество и искусство',
      className: 'art',
      skills: [
        'Рисование и иллюстрация',
        'Фотография',
        'Видеомонтаж',
        'Музыка и звук',
        'Актёрское мастерство',
        'Креативное письмо',
        'Арт-терапия',
        'Декор и DIY',
      ],
    },
    {
      skillsGroup: 'Иностранные языки',
      className: 'languages',
      skills: [
        'Английский',
        'Французкий',
        'Испанский',
        'Немецкий',
        'Китайский',
        'Японский',
        'Подготовка к экзаменам (IELTS, TOEFL)',
      ],
    },
    {
      skillsGroup: 'Образование и развитие',
      className: 'education',
      skills: [
        'Личностное развитие',
        'Навыки обучения',
        'Когнитивные техники',
        'Скорочтение',
        'Навыки преподования',
        'Коучинг',
      ],
    },
    {
      skillsGroup: 'Дом и уют',
      className: 'home',
      skills: [
        'Уборка и организация',
        'Домашние финансы',
        'Приготовление еды',
        'Домашние растения',
        'Ремонт',
        'Хранение вещей',
      ],
    },
    {
      skillsGroup: 'Здоровье и лайфстайл',
      className: 'health',
      skills: [
        'Йога и медитация',
        'Питание и ЗОЖ',
        'Ментальное здоровье',
        'Осознанность',
        'Физические тренировки',
        'Сон и восстановление',
        'Баланс жизни и работы',
      ],
    },
  ];

  const iconsMap: Record<string, FC<SVGType>> = {
    bissnes: BookSVG,
    art: BookSVG,
    languages: BookSVG,
    education: BookSVG,
    home: BookSVG,
    health: BookSVG,
  };

  return (
    <div className={styles.allSkillsModal}>
      {categories.map(({ className, skills, skillsGroup }) => {
        const Icon = iconsMap[className];

        return (
          <div className={`${styles.allSkillsModal__skill} ${styles[className]}`} key={skillsGroup}>
            <h2 className={styles.allSkillsModal__title}>
              <span className={styles.allSkillsModal__iconWrapper}>
                <Icon />
              </span>
              {skillsGroup}
            </h2>
            <ul className={styles.allSkillsModal__group}>
              {skills.map((skill, idx) =>
                skill ? (
                  <li key={idx} className={styles.allSkillsModal__item}>
                    <ButtonUI
                      type='button'
                      onClick={() => {}}
                      className={styles.allSkillsModal__btn}
                    >
                      {skill}
                    </ButtonUI>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
