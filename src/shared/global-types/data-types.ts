// На эти значения надо завязать цвета

// Типы фильтров
export type parentSkillFilterType =
  | 'business'
  | 'art'
  | 'languages'
  | 'education'
  | 'home'
  | 'lifestyle'
  | 'other';

export type BusinessSubType = 'team-management' | 'marketing' | 'sales' | 'brand';
export type ArtSubType = 'drawing' | 'photo' | 'mounting' | 'music';
export type LanguagesSubType = 'english' | 'french' | 'spanish' | 'german' | 'chinese' | 'japanese';
export type EducationSubType = 'personal-development' | 'training' | 'cognitive-skills';
export type HomeSubType = 'cleaning' | 'home-finances' | 'cooking';
export type LifestyleSubType = 'yoga' | 'nutrition' | 'mental-health' | 'mindfulness';
export type OtherSubType = string; // если нужно расширить

export type SubFilterTypeMap = {
  business: BusinessSubType;
  art: ArtSubType;
  languages: LanguagesSubType;
  education: EducationSubType;
  home: HomeSubType;
  lifestyle: LifestyleSubType;
  other: OtherSubType; // если есть
};

export type genderType = 'male' | 'female'; // Надо поменять на "none", поправить функции фильтрации и стор из за этого

export type educationType = 'teach' | 'learn';

export type commonFilterType = {
  title: string;
  value: genderType | educationType | 'empty';
  status: boolean;
};

export interface TSkillSubFilter<T extends parentSkillFilterType = parentSkillFilterType> {
  id: string;
  title: string;
  type: SubFilterTypeMap[T]; // тип зависит от родительского `type`
  status: boolean;
}

export interface TMainSkillFilter<T extends parentSkillFilterType = parentSkillFilterType> {
  id: string;
  type: T; // родительский тип (например, 'business')
  title: string;
  src: string;
  subFilters: TSkillSubFilter<T>[]; // подфильтры с соответствующим `type`
}

// Типы со скиллами

export interface TSkill<T extends parentSkillFilterType = parentSkillFilterType> {
  title: string;
  type: parentSkillFilterType;
  subType: SubFilterTypeMap[T];
}

// типы с заявками
export type offerStatus = 'pending' | 'rejected' | 'fulfilled';

export interface offerSkillType {
  userId: string;
  status: offerStatus;
  createdAt: number;
}

export type TImage = {
  link: string;
  name?: string;
};

// тип Карточки пользователя

export interface TCard {
  id: string;
  userId: string;
  teachSkill: TSkill[];
  learnSkill: TSkill[];
  name: string;
  city: string;
  age: number;
  description?: string;
  fullDescription: string;
  gender: genderType;
  createdAt: number;
  likes: string[];
  src: string;
  skillImages?: TImage[];
}

// тип профиля юзера
export interface TUser {
  id: string;
  gender: genderType;
  userId: string;
  name: string;
  city: string;
  age: number;
  mail: string;
  password: string;
  description: string;
  fullDescription: string;
  incoming: offerSkillType[];
  outgoing: offerSkillType[];
  image: string;
  likes: string[];
}

// тип города

export interface TCity {
  id: string;
  title: string;
}

export interface TCityFilter extends TCity {
  type: string;
  status: boolean;
}

// для сортировки карточек по новизне

export type SortType = 'default' | 'newest';

export interface TLoginData {
  mail: string;
  password: string;
}
