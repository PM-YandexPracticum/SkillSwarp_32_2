// Import компонента и типов
import { RadioButtonUI } from '@/shared/ui/radioUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/RadioButton',
  component: RadioButtonUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRadioButton: Story = {
  args:{
    label: '',
    value: '',
    checked: 'false',
    onChange: () => {},
  }
};
