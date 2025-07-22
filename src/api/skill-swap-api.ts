import type { TCard, TCity, TMainSkillFilter, TUser } from '@/shared/global-types';

const API_URL = 'http://localhost:3001';

// общая функция-конструктор для получения данных

async function fetchData<T>(API_URI: string): Promise<T[]> {
  try {
    // const citiesRaw = sessionStorage.getItem(API_URI);

    // if (!citiesRaw) {
    const response = await fetch(`${API_URL}/${API_URI}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T[] = await response.json();
    // sessionStorage.setItem(API_URI, JSON.stringify(data));
    return data;
    // }

    // return JSON.parse(citiesRaw) as T[];
  } catch (error) {
    console.error('Ошибка при получении списка городов ', error);
    throw error;
  }
}

// GET - запросы
// запрос на получение списка городов

export const fetchCitiesData = () => fetchData<TCity>('cities');

// Запрос на получение списка категорий

export const fetchCategoriesData = () => fetchData<TMainSkillFilter>('categories');

// запрос на получение списка карточек

export const fetchCardsData = () => fetchData<TCard>('cards');

// запрос на получение списка карточки навыка

// export const fetchSkillCardsData = () => fetchData<TSkillCard>('skill-cards');

// запрос на получение лайкнутых карточек

// export async function fetchLikedCardsByUser(userId: string): Promise<TCard[]> {
//   const API_URI = 'cards';
//   const API_URL = 'http://localhost:3001';

//   const response = await fetch(`${API_URL}/${API_URI}`, {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });
//   if (!response.ok) {
//     throw new Error(`Ошибка HTTP: ${response.status}`);
//   }

//   const allCards: TCard[] = await response.json();

//   return allCards.filter((card) => card.likes?.includes(userId));
// }

// Общая функция конструктор на POST запросы

async function postData<T>(elementData: Omit<T, 'id'>, API_URI: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}/${API_URI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(elementData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const dataRaw = sessionStorage.getItem(API_URI);
    const data: T = await response.json();
    let dataArray: T[] = [];

    if (dataRaw) {
      try {
        dataArray = JSON.parse(dataRaw) as T[];
      } catch (e) {
        console.warn(`Не удалось распарсить sessionStorage для ${API_URI}`, e);
      }
    }

    dataArray.push(data);
    sessionStorage.setItem(API_URI, JSON.stringify(dataArray));

    return data;
  } catch (error) {
    console.error('Возникла ошибка ', error);
    throw error;
  }
}

// POST - запросы
// POST карточки
export const postCard = (cardData: Omit<TCard, 'id'>) => postData<TCard>(cardData, 'cards');

// POST карточки навыка

// export const postSkillCard = (skillCardData: Omit<TSkillCard, 'id'>) =>
//   postData<TSkillCard>(skillCardData, 'skill-cards');

//PATCH - запросы

// лайк карточки
export async function postLikeCard(cardId: string, userId: string): Promise<void> {
  const API_URI = 'cards';

  const response = await fetch(`${API_URL}/${API_URI}/${cardId}`);
  
  if (!response.ok) throw new Error('Ошибка при получении карточки');

  const card = await response.json();
  const currentLikes: string[] = card.likes || [];

  const updatedLikes = [...currentLikes, userId];
  // console.log('Карточка которую лайкаем',cardId,'Пользователь которого лайкаем', userId)
  // console.log(updatedLikes);

  const updateRes = await fetch(`${API_URL}/${API_URI}/${cardId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: updatedLikes }),
  });

  if (!updateRes.ok) throw new Error('Ошибка при обновлении лайков');
}

export async function postSaveLikedCard(userData: TUser, userId: string): Promise<TUser> {
  const API_URI = 'users';
  const updateRes = await fetch(`${API_URL}/${API_URI}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: userData.likes }),
  });


  if (!updateRes.ok) throw new Error('Ошибка при обновлении лайков');
  const result:TUser =  await updateRes.json();
  return result;
}

//дизлайк карточки
export async function postDislikeCard(cardId: string, userId: string): Promise<void> {
  const API_URI = 'cards';

  const response = await fetch(`${API_URL}/${API_URI}/${cardId}`);
  if (!response.ok) throw new Error('Ошибка при получении карточки');

  const card: TCard = await response.json();

  const updatedLikes = card.likes.filter((like) => like !== userId);
  // console.log('Карточка которую ДИЗлайкаем', cardId, 'Пользователя которого ДИЗлайкаем', userId)
  // console.log(updatedLikes);
  const updateRes = await fetch(`${API_URL}/${API_URI}/${cardId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: updatedLikes }),
  });

  if (!updateRes.ok) throw new Error('Ошибка при обновлении лайков');

  // const cachedDataRaw = sessionStorage.getItem(API_URI);
  // if (cachedDataRaw) {
  //   try {
  //     const cachedData: TCard[] = JSON.parse(cachedDataRaw);
  //     const updatedData = cachedData.map((card) =>
  //       card.id === cardId ? { ...card, likes: updatedLikes } : card
  //     );
  //     sessionStorage.setItem(API_URI, JSON.stringify(updatedData));
  //   } catch (error) {
  //     console.warn('Ошибка при парсинге sessionStorage:', error);
  //   }
  // }
}

// отдельные операции с юзером

//регистрация
export async function registerUser(userData: Omit<TUser, 'id'>): Promise<TUser> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: TUser = await response.json();

    localStorage.setItem('current-user', JSON.stringify(data.userId));
    return data;
  } catch (error) {
    console.error('Ошибка при решистрации пользователя ', error);
    throw error;
  }
}

//логин
export async function loginUser(mail: string, password: string) {
  const response = await fetch(`${API_URL}/users?mail=${mail}&password=${password}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
  const data: TUser[] = await response.json();
  if (data.length === 0) {
    return null;
  }
  localStorage.setItem('current-user', data[0].id);
  return data[0];
}

// логаут
export async function logoutUser() {
  localStorage.removeItem('current-user');
  return null;
}

// изменение данных

export async function editUserData(userdata: Omit<TUser, 'id'>, userId: string) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userdata.name,
      age: userdata.age,
      mail: userdata.mail,
      password: userdata.password,
      city: userdata.city,
      description: userdata.description,
      gender: userdata.gender,
      image: userdata.image,
      incoming: userdata.incoming,
      outgoing: userdata.outgoing,
    }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data: TUser = await response.json();
  localStorage.setItem('current-user', data.userId);
  return data;
}

//вспомогательная функция для получения данных юзера

async function getUser(id: string): Promise<TUser> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data: TUser = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получени данных пользователя ', error);
    throw error;
  }
}

// Проверка авторизации

export const checkUserAuth = async (): Promise<TUser | null> => {
  const id = localStorage.getItem('current-user');
  if (id) {
    try {
      const user = await getUser(id);
      return user;
    } catch {
      localStorage.removeItem('current-user');
      return null;
    }
  }
  return null;
};

// общая функция на DELETE запросы

async function deleteData<T extends { id: string | number }>(
  API_URI: string,
  id: string
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/${API_URI}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const dataRaw = sessionStorage.getItem(API_URI);
    if (dataRaw) {
      const data: T[] = JSON.parse(dataRaw);
      const updatedData = data.filter((el) => el.id !== id);
      sessionStorage.setItem(API_URI, JSON.stringify(updatedData));
    }
  } catch (error) {
    console.error('Ошибка при удалении данных ', error);
    throw error;
  }
}

//DELETE - запросы
// DELETE карточки

export const deleteCard = (id: string) => deleteData<TCard>('cards', id);

//DELETE карточки навыка

// export const deleteSkillCard = (id: string) => deleteData<TSkillCard>('skill-cards', id);

// Это лишь примеры, надо все переписать
export async function addUser(userData: Omit<TUser, 'id'>): Promise<TUser> {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при добавлении пользователя:', error);
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
}

export async function getUserById(id: string): Promise<TUser> {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: TUser = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении карточек:', error);
    throw error;
  }
}

export async function checkRegistration(mail: string): Promise<TUser[]> {
  const response = await fetch(`${API_URL}/users?mail=${mail}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: TUser[] = await response.json();
  return data;
}

// export async function getSkillCardById(id: string) {
//   try {
//     const response = await fetch(`${API_URL}/skill-cards/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data: TSkillCard = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Ошибка при получении карточки навыка ', error);
//     throw error;
//   }
// }
