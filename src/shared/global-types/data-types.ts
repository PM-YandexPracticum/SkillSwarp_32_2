// На эти значения надо завязать цвета

// Типы фильтров
export type parentSkillFilterType = 'business' | 'art' | 'languages' | 'education' | 'home' | 'lifestyle' | 'other';

export type genderType = null | 'male' | 'female';

export type educationType = null | 'teach' | 'learn';

export type commonFilterType = {
  title: string
  value: genderType | educationType;
  status: boolean;
};

export interface TSkillSubFilter {
  id: string
  title: string
  type: string
  status:boolean
}

export interface TMainSkillFilter {
  id: string
  type: parentSkillFilterType
  title: string
  // status: filterStatus
  subFilters: TSkillSubFilter[]
}

// Типы со скиллами

export interface TSkill {
  skillTitle: string
  skillType: parentSkillFilterType
  skillSubType: string
}


export interface TSkillCard {
  id: string
  userId: string
  title: string
  description: string
  images: string[]
  skillType: parentSkillFilterType
  skillSubType: string
}


// типы с заявками
export type offerStatus = 'pending' | 'rejected' | 'fulfilled'

export interface incomingType {
  userId: string
  status: offerStatus
}

export interface outgoingType {
  userId: string
  status: offerStatus
}

// тип Карточки пользователя

export interface TCard {
  id: string
  userId: string
  teachSkill: TSkill[]
  learnSkill: TSkill[]
  name: string
  city: string
  age: number
  description: string
  gender: genderType
  createdAt: number
  likes: string[]
  src: string
}


// тип профиля юзера
export interface TUser {
  gender: genderType
  id: string
  name: string
  city: string
  age: number
  mail: string
  password: string
  description: string
  incoming: incomingType[]
  outgoing: outgoingType[]
  image: string
}

// тип города

export interface TCity {
  id: string
  title: string
}
