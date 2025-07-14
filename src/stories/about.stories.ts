// Import компонента и типов
import { RegisterAboutYouUI } from '@/shared/ui/registerAboutYouUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/registerAboutYouUI',
  component: RegisterAboutYouUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultregisterAboutYouUI: Story = {
  args:{
    label: '',
    value: '',
    checked: 'false',
    onChange: () => {},
  }
};
