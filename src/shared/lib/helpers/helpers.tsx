//файл для хранения вспомогательных функций для сокращения кода

import type { TCard } from "@/shared/global-types";

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

export const sortByPopular = (cards: TCard[]) => {
  return cards.sort((a, b) => b.likes.length - a.likes.length)
}

// сортировка по новизне

export const sortByNewest = (cards: TCard[]) => {
  return cards.sort((a,b) => b.createdAt - a.createdAt)
}

// сортировка для рекомендаций

export const sorByRecomended = (cards: TCard[]) => {
  const result = [...cards]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}