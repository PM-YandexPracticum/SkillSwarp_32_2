// Import компонента и типов
import { UserCardUI } from '@/shared/ui/userCardUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/UserCard', // Название категории и компоненты
  component: UserCardUI, // Какой компонент используется
  tags: ['autodocs'], // Метатег для документации
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderCard: Story = {
  args: {
    skills: [{ title: 'Английский язык', type: 'art' }],
    desired: [
      { title: 'Медитация', type: 'art' },
      { title: 'Тайм Менеджмент', type: 'art' },
      { title: 'aawdwad', type: 'art' },
      { title: 'aawdwad', type: 'art' },
    ],
    user: {
      name: 'Илона',
      age: 33,
      city: 'Екатеринбург',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Всем Привет! Рада знакомству. Расскажу все о медитации!', // Описание пользователя
    },
    type: 'short',
    buttonClick: () => {},
    setLike: () => {},
  },
};
