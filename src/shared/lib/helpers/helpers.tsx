import type { filterStatus, genderType, subFilterType, TCard } from '../../../../db/types';
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
  subCathegories: subFilterType[];
  filterStatus: filterStatusType;
}

// вспомогательные функции

export const filterByCities = (cards: TCard[], cities: string[]) => {
  const filteredCards: TCard[] = [];

  if (cities.length === 0) {
    filteredCards.push(...cards);
  } else {
    cards.forEach((card) => {
      cities.forEach((city) => {
        card.city === city && filteredCards.push(card);
      });
    });
  }

  return filteredCards;
};

export const filterByGender = (cards: TCard[], gender: genderType) => {
  return !gender ? cards.filter((card) => card.gender === gender) : cards;
};

const filterByCathegories = (
  cards: TCard[],
  cathegories: subFilterType[],
  filterStatus: filterStatusType
) => {
  
};

// сама функция

export const filterCards = (cards: TCard[], filterStore: filterStore) => {
  let filteredCards: TCard[] = [];

  if (
    filterStore.cities.length === 0 &&
    filterStore.subCathegories.length === 0 &&
    filterStore.filterStatus === 'all' &&
    filterStore.gender === null
  ) {
    filteredCards.push(...cards);
  }

  filteredCards.push(...filterByCities(cards, filterStore.cities));

  filteredCards = filterByGender(filteredCards, filterStore.gender);

  return filteredCards;
};
