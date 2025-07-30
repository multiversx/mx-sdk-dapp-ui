import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Pagination } from './pagination';

// Decorator for custom background and font
const withCustomStyles = (Story, context) => {
  const { background = '#f00', fontFamily = 'inherit' } = context.args;

  console.log({ Story, context });

  return (
    <div style={{ background, fontFamily, padding: '2rem' }} class="mvx-flex mvx-pt-40 mvx-pb-4 pb-4">
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
    fontFamily: 'inherit', // for decorator
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } },
    totalPages: { control: { type: 'number', min: 1 } },
    isDisabled: { control: 'boolean' },
    class: { control: 'text' },
    fontFamily: { control: 'text' },
  },
} as Meta<Pagination>;

const processStory = (args: Partial<Pagination>): StoryObj<Pagination> => ({
  args,
  render: properties => <mvx-pagination {...properties} />,
});

export const Default = processStory({ currentPage: 1, totalPages: 10, isDisabled: false, class: '' });
export const Disabled = processStory({ currentPage: 5, totalPages: 20, isDisabled: true, class: 'custom-pagination' });
export const FirstPage = processStory({ currentPage: 1 });
export const LastPage = processStory({ currentPage: 10 });
export const SinglePage = processStory({ totalPages: 1 });
export const ManyPages = processStory({ currentPage: 520, totalPages: 1000 });
