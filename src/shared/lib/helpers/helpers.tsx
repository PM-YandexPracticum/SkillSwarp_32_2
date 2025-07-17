import type { FilterState } from '@/services/slices';
import type {
  commonFilterType,
  TCard,
  TCityFilter,
  TMainSkillFilter,
  TSkillSubFilter,
} from '@/shared/global-types';

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


// Фильтрация по городам
export const filterByCities = (cards: TCard[], cities: TCityFilter[]) => {
  const selectedCityIds = cities.filter(ccity => ccity.status).map(ccity => ccity.id);
  if (selectedCityIds.length === 0) return cards;

  return cards.filter((card) => selectedCityIds.includes(card.city));
};

// Фильтрация по полу
export const filterByGender = (cards: TCard[], genderFilters: commonFilterType[]) => {
  const selected = genderFilters.find((filter) => filter.status);
  if (!selected || !selected.value) return cards;

  return cards.filter((card) => card.gender === selected.value);
};

// Фильтрация по категориям и образованию
export const filterByCategories = (
  cards: TCard[],
  skillFilters: TMainSkillFilter[],
  educationFilters: commonFilterType[]
): TCard[] => {
  const toggledSubSkills: TSkillSubFilter[] = [];
  const toggledEducationStatus = educationFilters.find((filter) => filter.status)?.value;

  skillFilters.forEach((skill) => {
    skill.subFilters.forEach((subfilter) => {
      if (subfilter.status) {
        toggledSubSkills.push(subfilter);
      }
    });
  });

  if (!toggledSubSkills.length && toggledEducationStatus === null) return cards;

  const matchSkill = (cardSkills: { subType: string }[]) =>
    cardSkills.some((skill) =>
      toggledSubSkills.some((subSkill) => subSkill.type === skill.subType)
    );

  if (!toggledEducationStatus) {
    return cards.filter((card) => matchSkill(card.teachSkill) || matchSkill(card.learnSkill));
  }

  if (toggledEducationStatus === 'teach') {
    return cards.filter((card) => matchSkill(card.learnSkill));
  } else {
    return cards.filter((card) => matchSkill(card.teachSkill));
  }
};


// Главная функция
export const filterCards = (cards: TCard[], filterStore: FilterState): TCard[] => {
  let filteredCards = [...cards];
  filteredCards = filterByCities(filteredCards, filterStore.cities);
  filteredCards = filterByGender(filteredCards, filterStore.gender);
  filteredCards = filterByCategories(filteredCards, filterStore.skills, filterStore.education);

  return filteredCards;
};

// сортировка по популярности

export const sortByPopular = (cards: TCard[], count?: number): TCard[] => {
  //const sorted = cards.sort((a, b) => b.likes.length - a.likes.length);
  const sorted = [...cards].sort((a, b) => b.likes.length - a.likes.length);
  if (!count) return sorted;
  return sorted.filter((__, index) => index < count);
};

// сортировка по новизне

export const sortByNewest = (cards: TCard[], count?: number): TCard[] => {
  //const sorted = cards.sort((a, b) => b.createdAt - a.createdAt);
  const sorted = [...cards].sort((a, b) => b.createdAt - a.createdAt);
  if (!count) return sorted;
  return sorted.filter((__, index) => index < count);
};

// сортировка для рекомендаций

// хаотичная
export const sorByRecommendedChaos = (cards: TCard[], count?: number): TCard[] => {
  const sorted = [...cards];
  for (let i = sorted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
  }

  if (!count) return sorted;

  return sorted.filter((__, index) => index < count);
};

// по скиллам

export const sortByRecommendedSkills = (
  cards: TCard[],
  userCard: TCard,
  count?: number
): TCard[] => {
  //const sorted = cards.sort((first, second) => {
  const sorted = [...cards].sort((first, second) => {
    const countMatches = (card: TCard) => {
      return card.teachSkill.filter((skill) =>
        userCard.learnSkill.some(
          (userSkill) => skill.type === userSkill.type && skill.subType === userSkill.subType
        )
      ).length;
    };

    return countMatches(second) - countMatches(first);
  });

  if (!count) return sorted;

  return sorted.filter((__, index) => index < count);
};

// проверяем, выбран ли хотя бы 1 фильтр, чтобы проводить фильтрацию

export const checkActiveSkillFilter = (filters: TMainSkillFilter[]): boolean => {
  return filters.some((mainFilter) => mainFilter.subFilters.some((sub) => sub.status));
};

export const checkActiveGenderFilter = (filters: commonFilterType[]): boolean => {
  return filters.some(
    (genderFilter) => genderFilter.status && genderFilter.title !== 'Не имеет значения'
  );
};

export const checkActiveEducationFilter = (filters: commonFilterType[]): boolean => {
  return filters.some((educateFilter) => educateFilter.status && educateFilter.title !== 'Всё');
};

export const checkActiveCityFilter = (filters: TCityFilter[]): boolean => {
  return filters.some((cityFilter) => cityFilter.status);
};

export const checkAllActiveFilters = (
  skillFilters: TMainSkillFilter[],
  genderFilters: commonFilterType[],
  educationFilters: commonFilterType[],
  cityFilters: TCityFilter[]
): boolean => {
  return (
    checkActiveSkillFilter(skillFilters) ||
    checkActiveGenderFilter(genderFilters) ||
    checkActiveEducationFilter(educationFilters) ||
    checkActiveCityFilter(cityFilters)
  );
};
