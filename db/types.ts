//вспомогательные типы

type filterType = 'business' | 'art' | 'languages' | 'education' | 'home' | 'lifestyle' | 'other';

type subFilterType = string;

// type filterStatus = 'partial' | 'full' | 'empty'

type genderType = null | 'male' | 'female';

type cityType = string

type status = 'penging' | 'rejected' | 'fullfiled'

interface incomingType {
  userId: string
  status: status
}

interface outgoingType {
  userId: string
  status: status
}

interface Tskill {
  skillTitle: string
  type: filterType
  subType: subFilterType
}

// типы карточек 

export interface TCard {
  id: string
  userId: string
  teachSkill: Tskill[]
  learnSkill: Tskill[]
  name: string
  city: string
  age: number
  description: string
  gender: genderType
  createdAt: number
  likes: string[]
  src: string
}

// типы компонентов скилла

export interface TSkillCard {
  id: string
  userId: string
  title: string
  description: string
  images: string[]
  filterType: filterType
  subFilterType: subFilterType
}

// типы фильтров

interface TSubFilter {
  id: string
  title: string
  // isSelected: boolean
  type: subFilterType
}

export interface TFilter {
  id: string
  type: filterType
  title: string
  // status: filterStatus
  subFilters: TSubFilter[]
}

// тип профиля юзера

export interface TUser {
  gender: genderType
  id: string
  name: string
  city: cityType
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
  title: cityType
}
