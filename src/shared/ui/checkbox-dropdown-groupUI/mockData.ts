export const mainFilters = [
  {
    id: '0',
    type: 'business',
    title: 'Бизнес и карьера',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      {
        title: 'Управление командой',
        id: '0-0',

        type: 'team-management',
      },
      { title: 'Маркетинг и реклама', id: '0-1', type: 'marketing' },
      { title: 'Продажи и переговоры', id: '0-2', type: 'sales' },
      { title: 'Личный бренд', id: '0-3', type: 'brand' },
      { title: 'Резюме и собеседования', id: '0-4', type: 'resume' },
      { title: 'Тайм-менеджмент', id: '0-5', type: 'time-management' },
      {
        title: 'Проектное управление',
        id: '0-6',

        type: 'project-management',
      },
      {
        title: 'Предпринимательство',
        id: '0-7',

        type: 'entrepreneurship',
      },
    ],
  },
  {
    id: '1',
    type: 'art',
    title: 'Творчество и искусство',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      { title: 'Рисование и иллюстрация', id: '1-0', type: 'drawing' },
      { title: 'Фотография', id: '1-1', type: 'photo' },
      { title: 'Монтаж', id: '1-2', type: 'mounting' },
      { title: 'Музыка и звук', id: '1-3', type: 'music' },
      { title: 'Актерское мастерство', id: '1-4', type: 'acting' },
      {
        title: 'Креативное письмо',
        id: '1-5',

        type: 'creative-writing',
      },
      { title: 'Арт-терапия', id: '1-6', type: 'art-therapy' },
      { title: 'Декор и DIY', id: '1-7', type: 'diy' },
    ],
  },
  {
    id: '2',
    type: 'languages',
    title: 'Иностранные языки',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      { title: 'Английский', id: '2-0', type: 'english' },
      { title: 'Французский', id: '2-1', type: 'french' },
      { title: 'Испанский', id: '2-2', type: 'spanish' },
      { title: 'Немецкий', id: '2-3', type: 'german' },
      { title: 'Китайский', id: '2-4', type: 'chinese' },
      { title: 'Японский', id: '2-5', type: 'japanese' },
      {
        title: 'Подготовка к экзаменам (IELTS, TOEFL)',
        id: '2-6',
        type: 'exams',
      },
    ],
  },
  {
    id: '3',
    type: 'education',
    title: 'Образование и развитие',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      {
        title: 'Личное развитие',
        id: '3-0',

        type: 'personal-development',
      },
      { title: 'Навыки обучения', id: '3-1', type: 'training' },
      {
        title: 'Когнитивные навыки',
        id: '3-2',

        type: 'cognitive-skills',
      },
      { title: 'Скорочтение', id: '3-3', type: 'speed-reading' },
      { title: 'Навыки преподавания', id: '3-4', type: 'teaching' },
      { title: 'Коучинг', id: '3-5', type: 'coaching' },
    ],
  },
  {
    id: '4',
    type: 'home',
    title: 'Дом и уют',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      { title: 'Уборки и организация', id: '4-0', type: 'cleaning ' },
      { title: 'Домашние финансы', id: '4-1', type: 'home-finances' },
      { title: 'Приготовление еды', id: '4-2', type: 'cooking' },
      { title: 'Домашние растения', id: '4-3', type: 'house-plants' },
      { title: 'Ремонт', id: '4-4', type: 'repair' },
      { title: 'Хранение вещей', id: '4-5', type: 'storing-things' },
    ],
  },
  {
    id: '5',
    type: 'lifestyle',
    title: 'Здоровье и лайфстайл',
    filterStatus: 'empty',
    src: '/#',
    subfilters: [
      { title: 'Йога и медитация', id: '5-0', type: 'yoga' },
      { title: 'Питание и ЗОЖ', id: '5-1', type: 'nutrition' },
      { title: 'Ментальное здоровье', id: '5-2', type: 'mental-health' },
      { title: 'Осознанность', id: '5-3', type: 'mindfulness' },
      {
        title: 'Физические тренировки',
        id: '5-4',

        type: 'physical-training',
      },
      { title: 'Сон и восстановление', id: '5-5', type: 'recovery' },
      { title: 'Баланс жизни и работы', id: '5-6', type: 'life-balance' },
    ],
  },
];
