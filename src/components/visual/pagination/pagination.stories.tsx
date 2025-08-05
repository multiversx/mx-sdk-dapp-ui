import './pagination.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { Pagination } from './pagination';

const paginationStoryClasses: Record<string, string> = {
  wrapper: 'mvx:justify-center mvx:flex mvx:gap-4 mvx:pt-24',
};

const storySettings: Meta<Pagination> = {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  render: properties => <mvx-pagination {...properties} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    isDisabled: false,
    class: '',
  },
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 10 } },
    totalPages: { control: { type: 'number', min: 1 } },
    isDisabled: { control: 'boolean' },
    class: { control: 'text' },
  },
  decorators: [
    Story => (
      <div class={paginationStoryClasses.wrapper}>
        <Story />
      </div>
    ),
  ],
};

const processStory = (storyArguments: Partial<Pagination>): StoryObj<Pagination> => ({
  args: storyArguments,
  render: properties => <mvx-pagination {...properties} />,
});

export const Default = processStory({
  currentPage: 1,
  totalPages: 10,
  isDisabled: false,
  class: '',
});

export const Disabled = processStory({
  currentPage: 5,
  totalPages: 20,
  isDisabled: true,
  class: 'custom-pagination',
});

export const FirstPage = processStory({ currentPage: 1 });
export const LastPage = processStory({ currentPage: 10 });
export const SinglePage = processStory({ totalPages: 1 });
export const ManyPages = processStory({ currentPage: 520, totalPages: 1000 });

export default storySettings;
