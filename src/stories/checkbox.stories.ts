// Import компонента и типов
import { CheckboxUI } from '@/shared/ui/checkboxUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/Checkbox',
  component: CheckboxUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCheckbox: Story = {
  args:{
    label: '',
    value: '',
    checked: 'false',
    onChange: () => {},
  }
};
