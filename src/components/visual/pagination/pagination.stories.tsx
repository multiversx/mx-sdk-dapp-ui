import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Pagination } from './pagination';

const meta: Meta<Pagination> = {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  render: properties => <mvx pagination {...properties} />,
  args: { currentPage: 1, totalPages: 10, isDisabled: false, class: '' },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 }, description: 'Current active page' },
    totalPages: { control: { type: 'number', min: 1 }, description: 'Total number of pages' },
    isDisabled: { control: 'boolean', description: 'Disable pagination controls' },
    class: { control: 'text', description: 'Custom CSS class' },
  },
};

export default meta;

type Story = StoryObj<Pagination>;

export const Primary: Story = {
  args: { currentPage: 1, totalPages: 10, isDisabled: false, class: '' },
  render: props => <mvx-pagination {...props} />,
};

/**
 * Storybook story without custom render function
 */
export const Secondary: Story = {
  args: { currentPage: 5, totalPages: 20, isDisabled: true, class: 'custom-pagination' },
  render: props => <mvx-pagination {...props} />,
};
