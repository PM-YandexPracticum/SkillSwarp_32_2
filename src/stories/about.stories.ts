// Import компонента и типов
import { RegisterAboutYou } from '@/widgets/registerAboutYou';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/registerAboutYou',
  component: RegisterAboutYou,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultregisterAboutYou: Story = {
  args: {
    label: '',
    value: '',
    checked: 'false',
    onChange: () => {},
  },
};
