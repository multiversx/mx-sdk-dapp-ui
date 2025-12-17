import './pagination.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

import type { PaginationPropsType } from './components/Pagination/Pagination';

// prettier-ignore
const styles = {
  paginationStoriesWrapper: 'pagination-stories-wrapper mvx:justify-center mvx:flex mvx:gap-4 mvx:pt-24',
} satisfies Record<string, string>;

const storySettings: Meta<PaginationPropsType> = {
  tags: ['autodocs'],
  title: 'Components/Pagination',
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
      <div class={styles.paginationStoriesWrapper}>
        <Story />
      </div>
    ),
  ],
};

export const Default: StoryObj<PaginationPropsType> = {
  render: properties => <mvx-pagination {...properties} />,
};

export const Disabled: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination currentPage={5} totalPages={20} isDisabled={true} class="custom-pagination" />,
};

export const FirstPage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination currentPage={1} totalPages={10} />,
};

export const LastPage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination currentPage={10} totalPages={10} />,
};

export const SinglePage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination currentPage={1} totalPages={1} />,
};

export const ManyPages: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination currentPage={520} totalPages={1000} />,
};

export default storySettings;
