import type { TSkillCard, TUser } from '@/shared/global-types';

const API_URL = 'http://localhost:3001';

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

export async function getSkillCards(): Promise<TSkillCard[]> {
  try {
    const response = await fetch(`${API_URL}/skill-cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TSkillCard[] = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при получении карточек:', error);
    throw error;
  }
}


export async function getUserById(id:string): Promise<TUser> {
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
