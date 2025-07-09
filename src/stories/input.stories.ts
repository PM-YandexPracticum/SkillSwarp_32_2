// Import компонента и типов
import { InputUI } from '@/shared/ui/inputUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/Input',
  component: InputUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args:{
     type: 'text',
     placeholder: '',
     onChange: () => {},
     value: 'Введите имя',
     name: 'Кнопка ввести',
     tip: 'Введите как к вам обращаться',
     error: 'false',
     errorText: 'Что-то пошло не так',
     label: 'Имя',
     icon: 'edit',
  }
};
