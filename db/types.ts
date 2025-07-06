//вспомогательные типы

type filterType = 'business' | 'art' | 'languages' | 'education' | 'home' | 'lifestyle' | 'other';

type SubFilterType = string;

type genderType = null | 'male' | 'female';

// типы для карточек
interface TSkill {
  title: string;
  type: filterType;
}

interface TCard {
  id: string;
  userId: string;
  skills: TSkill[];
  desired: TSkill[];
  name: string;
  city: string;
  age: string;
  description: string;
  isLiked: boolean;
  likes: string[];
  gender: genderType;
}

type cards = TCard[];

//типы для списка фильтров

interface SubFilter {
  title: string;
  id: string;
}

interface TFilter {
  subfilters: SubFilter[];
  id: string;
  type: filterType;
  title: string;
}

type filters = TFilter[];

//типы для расширенной карточки

type imageSrc = string;

interface skillCard {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: imageSrc[];
  filterType: filterType;
  subFilterType: SubFilterType;
}

type skillCards = skillCard[];

//тип для аккаунта пользователя. Решил жобавить и его

interface TUserProfile {
  gender: genderType;
  id: string;
  name: string;
  city: string;
  age: number;
  mail: string;
  password: string;
  description: string;
  image: string;
}

//список городов

type CityTitle =
  | 'Москва'
  | 'Санкт-Петербург'
  | 'Новосибирск'
  | 'Екатеринбург'
  | 'Казань'
  | 'Нижний Новгород'
  | 'Челябинск'
  | 'Самара'
  | 'Ростов-на-Дону'
  | 'Уфа'
  | 'Красноярск'
  | 'Пермь'
  | 'Воронеж'
  | 'Волгоград'
  | 'Краснодар'
  | 'Тюмень'
  | 'Ижевск'
  | 'Барнаул'
  | 'Ульяновск'
  | 'Иркутск'
  | 'Хабаровск'
  | 'Ярославль'
  | 'Владивосток'
  | 'Томск'
  | 'Омск';

interface TCity {
  title: CityTitle;
  id: string;
}

type cities = TCity[];
