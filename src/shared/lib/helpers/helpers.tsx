//файл для хранения вспомогательных функций для сокращения кода

import type { TCard } from '@/shared/global-types';

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

// сортировка по популярности

export const sortByPopular = (cards: TCard[], count?: number): TCard[] => {
  const sorted = cards.sort((a, b) => b.likes.length - a.likes.length);
  if(!count) return sorted;
  return sorted.filter((__, index) => index < count);
};

// сортировка по новизне

export const sortByNewest = (cards: TCard[], count?: number): TCard[] => {
  const sorted = cards.sort((a, b) => b.createdAt - a.createdAt);
  if(!count) return sorted;
  return sorted.filter((__, index) => index < count );
};

// сортировка для рекомендаций

// хаотичная
export const sorByRecomendedChaos = (cards: TCard[], count?: number): TCard[] => {
  const sorted = [...cards];
  for (let i = sorted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
  }

  if(!count) return sorted;

  return sorted.filter((__, index) => index < count);
};

// по скиллам

export const sortByRecommendedSkills = (cards: TCard[], userCard: TCard, count?: number): TCard[] => {
  const sorted = cards.sort((first, second) => {
    const countMatches = (card: TCard) => {
      return card.teachSkill.filter((skill) =>
        userCard.learnSkill.some(
          (userSkill) => skill.type === userSkill.type && skill.subType === userSkill.subType
        )
      ).length;
    };

    return countMatches(second) - countMatches(first);
  });

  if(!count) return sorted;

  return sorted.filter((__, index) => index < count);
};
