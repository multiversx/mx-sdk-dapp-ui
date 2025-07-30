import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Pagination } from './pagination';

// Decorator for custom background and font
const withCustomStyles = (Story, context) => {
  const { background = '#fff', fontFamily = 'inherit' } = context.args;
  return (
    <div style={{ background, fontFamily, padding: '2rem' }}>
      <Story />
    </div>
  );
};

export default {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  decorators: [withCustomStyles],
  render: properties => <mvx pagination {...properties} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    isDisabled: false,
    class: '',
    background: '#fff', // for decorator
    fontFamily: 'inherit', // for decorator
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } },
    totalPages: { control: { type: 'number', min: 1 } },
    isDisabled: { control: 'boolean' },
    class: { control: 'text' },
    background: { control: 'color' },
    fontFamily: { control: 'text' },
  },
} as Meta<Pagination>;

export const Default: StoryObj<Pagination> = {
  args: { currentPage: 1, totalPages: 10, isDisabled: false, class: '' },
  render: props => <mvx-pagination {...props} />,
};

export const Disabled: StoryObj<Pagination> = {
  args: { currentPage: 5, totalPages: 20, isDisabled: true, class: 'custom-pagination' },
  render: props => <mvx-pagination {...props} />,
};

// First Page
export const FirstPage: StoryObj<Pagination> = {
  args: { currentPage: 1 },
  render: props => <mvx-pagination {...props} />,
};

// Last Page
export const LastPage: StoryObj<Pagination> = {
  args: { currentPage: 10 },
  render: props => <mvx-pagination {...props} />,
};

// Single Page
export const SinglePage: StoryObj<Pagination> = {
  args: { totalPages: 1 },
  render: props => <mvx-pagination {...props} />,
};

// Many Pages
export const ManyPages: StoryObj<Pagination> = {
  args: { totalPages: 100, currentPage: 50 },
  render: props => <mvx-pagination {...props} />,
};
