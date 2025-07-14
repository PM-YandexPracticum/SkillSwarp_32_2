import type { genderType, TCard, TSkillSubFilter } from "@/shared/global-types";

;
//файл для хранения вспомогательных функций для сокращения кода

export const formatAge = (age: number) => {
  const lastTwo = age % 100;
  const lastOne = age % 10;

  let suffix: string;

  if (lastTwo >= 11 && lastTwo <= 14) {
    suffix = 'лет';
  } else if (lastOne === 1) {
    suffix = 'год';
  } else if (lastOne >= 2 && lastOne <= 4) {
    suffix = 'года';
  } else {
    suffix = 'лет';
  }

  return `${age} ${suffix}`;
};

// решил что эта функция будет работать со стором фильтра

//временный интерфейс для типизпции

type filterStatusType = 'all' | 'learn' | 'teach';

interface filterStore {
  cities: string[];
  gender: genderType;
  subCathegories: TSkillSubFilter[];
  filterStatus: filterStatusType;
}

// вспомогательные функции

export const filterByCities = (cards: TCard[], cities: string[]) => {
  if (cities.length === 0) return [...cards];

  return cards.filter((card) => cities.includes(card.city));
};

export const filterByGender = (cards: TCard[], gender: genderType) => {
  return !gender ? cards.filter((card) => card.gender === gender) : cards;
};

const filterByCategories = (
  cards: TCard[],
  cathegories: TSkillSubFilter[],
  filterStatus: filterStatusType
): TCard[] => {
  if (cathegories.length === 0 || filterStatus === 'all') return cards;

  return cards.filter((card) => {
    const skills = filterStatus === 'teach' ? card.teachSkill : card.learnSkill;

    return skills.some((skill) =>
      cathegories.some((cat) => cat.id === skill.skillSubType)
    );
  });
};

// сама функция

export const filterCards = (cards: TCard[], filterStore: filterStore) => {
  let filteredCards: TCard[] = [...cards];

  // Фильтр по городам
  filteredCards = filterByCities(filteredCards, filterStore.cities);

  // Фильтр по полу
  filteredCards = filterByGender(filteredCards, filterStore.gender);

  // Фильтр по категориям
  filteredCards = filterByCategories(
    filteredCards,
    filterStore.subCathegories,
    filterStore.filterStatus
  );

  return filteredCards;
};
