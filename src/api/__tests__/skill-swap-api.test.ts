// src/api/__tests__/skill-swap-api.test.ts
import { describe, it, beforeEach, vi, expect } from 'vitest';
import {
  fetchCitiesData,
  fetchCategoriesData,
  fetchCardsData,
  postCard,
  postLikeCard,
  postDislikeCard,
  postSaveLikedCard,
  registerUser,
  loginUser,
  logoutUser,
  editUserData,
  checkUserAuth,
  deleteCard,
  addUser,
  getUserById,
  checkRegistration,
} from '../skill-swap-api';
import type { TCard, TUser, TCity, TMainSkillFilter } from '@/shared/global-types';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('API: fetchCitiesData', () => {
  it('успешно возвращает список городов', async () => {
    const mockData: TCity[] = [{ id: '1', title: 'Москва' }];
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

    const result = await fetchCitiesData();
    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/cities', expect.any(Object));
  });

  it('выбрасывает ошибку при статусе != ok', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchCitiesData()).rejects.toThrow('HTTP error! status: 500');
  });

  it('выбрасывает ошибку при сетевой ошибке', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    await expect(fetchCitiesData()).rejects.toThrow('Network error');
  });
});

describe('API: postCard', () => {
  const mockCard: TCard = {
    id: '1',
    userId: 'user-1',
    name: 'User',
    age: 30,
    city: 'Москва',
    gender: 'male',
    description: '',
    fullDescription: '',
    teachSkill: [],
    learnSkill: [],
    createdAt: Date.now(),
    likes: [],
    src: '',
    skillImages: [],
  };

  it('успешно создаёт карточку и кэширует её', async () => {
    const dataToPost = { ...mockCard };
    delete (dataToPost as any).id;

    mockSessionStorage.getItem.mockReturnValue(null);
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => mockCard });

    const result = await postCard(dataToPost);
    expect(result).toEqual(mockCard);
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:3001/cards', expect.objectContaining({ method: 'POST' }));
    expect(mockSessionStorage.setItem).toHaveBeenCalled();
  });

  it('выбрасывает ошибку при неудачном запросе', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 400 });
    await expect(postCard({ ...mockCard, id: undefined as any })).rejects.toThrow('Ошибка HTTP: 400');
  });
});

describe('API: loginUser', () => {
  const mockUser: TUser = {
    id: '1',
    userId: '1',
    name: 'Test',
    age: 30,
    city: 'Москва',
    gender: 'male',
    mail: 'test@test.com',
    password: '123456',
    description: '',
    fullDescription: '',
    image: '',
    incoming: [],
    outgoing: [],
    likes: [],
  };

  it('успешно логинит пользователя', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [mockUser] });
    const result = await loginUser('test@test.com', '123456');
    expect(result).toEqual(mockUser);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('current-user', mockUser.id);
  });

  it('возвращает null если пользователь не найден', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    const result = await loginUser('none@test.com', 'wrong');
    expect(result).toBeNull();
  });

  it('выбрасывает ошибку при плохом запросе', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(loginUser('test@test.com', '123456')).rejects.toThrow('Ошибка HTTP: 500');
  });
});
