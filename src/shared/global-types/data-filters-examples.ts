import type { TMainSkillFilter } from './data-types';

export const MAIN_FILTERS_MOCK: TMainSkillFilter[] = [
  {
    id: '0',
    type: 'business',
    title: 'Бизнес и карьера',
    src: '/#',
    subFilters: [
      {
        title: 'Управление командой',
        id: '0-0',
        type: 'team-management',
        status: false,
      },
      { title: 'Маркетинг и реклама', id: '0-1', type: 'marketing', status: false },
      { title: 'Продажи и переговоры', id: '0-2', type: 'sales', status: false },
      { title: 'Личный бренд', id: '0-3', type: 'brand', status: false },
    ],
  },
  {
    id: '1',
    type: 'art',
    title: 'Творчество и искусство',
    src: '/#',
    subFilters: [
      { title: 'Рисование и иллюстрация', id: '1-0', type: 'drawing', status: false },
      { title: 'Фотография', id: '1-1', type: 'photo', status: false },
      { title: 'Монтаж', id: '1-2', type: 'mounting', status: false },
      { title: 'Музыка и звук', id: '1-3', type: 'music', status: false },
    ],
  },
  {
    id: '2',
    type: 'languages',
    title: 'Иностранные языки',
    src: '/#',
    subFilters: [
      { title: 'Английский', id: '2-0', type: 'english', status: false },
      { title: 'Французский', id: '2-1', type: 'french', status: false },
      { title: 'Испанский', id: '2-2', type: 'spanish', status: false },
      { title: 'Немецкий', id: '2-3', type: 'german', status: false },
      { title: 'Китайский', id: '2-4', type: 'chinese', status: false },
      { title: 'Японский', id: '2-5', type: 'japanese', status: false },
    ],
  },
  {
    id: '3',
    type: 'education',
    title: 'Образование и развитие',
    src: '/#',
    subFilters: [
      {
        title: 'Личное развитие',
        id: '3-0',
        type: 'personal-development',
        status: false,
      },
      { title: 'Навыки обучения', id: '3-1', type: 'training', status: false },
      {
        title: 'Когнитивные навыки',
        id: '3-2',
        type: 'cognitive-skills',
        status: false,
      },
    ],
  },
  {
    id: '4',
    type: 'home',
    title: 'Дом и уют',
    src: '/#',
    subFilters: [
      { title: 'Уборки и организация', id: '4-0', type: 'cleaning ', status: false },
      { title: 'Домашние финансы', id: '4-1', type: 'home-finances', status: false },
      { title: 'Приготовление еды', id: '4-2', type: 'cooking', status: false },
    ],
  },
  {
    id: '5',
    type: 'lifestyle',
    title: 'Здоровье и лайфстайл',
    src: '/#',
    subFilters: [
      { title: 'Йога и медитация', id: '5-0', type: 'yoga', status: false },
      { title: 'Питание и ЗОЖ', id: '5-1', type: 'nutrition', status: false },
      { title: 'Ментальное здоровье', id: '5-2', type: 'mental-health', status: false },
      { title: 'Осознанность', id: '5-3', type: 'mindfulness', status: false },
    ],
  },
];

