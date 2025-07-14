// Import компонента и типов
import { RegisterYouOfferUI } from '@/shared/ui/registerYouOfferUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/RegisterYouOfferUI',
  component: RegisterYouOfferUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRegisterYouOfferUI: Story = {
  args:{
      category:[
      { name: 'Дом и уют', id: '1' },
      { name: 'Иностранные языки', id: '2' },
      { name: 'Бизнес и карьера', id: '3' },
    ]
    }
};
