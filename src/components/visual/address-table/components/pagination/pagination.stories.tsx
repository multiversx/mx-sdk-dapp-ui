import './pagination.scss';

import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';

type PaginationComponent = {
  currentPage: number;
  totalPages: number;
  isDisabled?: boolean;
  class?: string;
};

// prettier-ignore
const styles = {
  paginationStoriesWrapper: 'pagination-stories-wrapper mvx:justify-center mvx:flex mvx:gap-4 mvx:pt-24',
} satisfies Record<string, string>;

const storySettings: Meta<PaginationComponent> = {
  tags: ['autodocs'],
  title: 'Visual/Pagination',
  component: 'mvx-pagination',
  parameters: {
    docs: {
      description: {
        component:
          'Pagination is not exported as a webcomponent. Make sure to exclude the component from the tsconfig.json file.',
      },
    },
  },
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

export const Default: StoryObj<PaginationComponent> = {
  render: properties => <mvx-pagination {...properties} />,
};

export const Disabled: StoryObj<PaginationComponent> = {
  render: () => <mvx-pagination currentPage={5} totalPages={20} isDisabled={true} class="custom-pagination" />,
};

export const FirstPage: StoryObj<PaginationComponent> = {
  render: () => <mvx-pagination currentPage={1} totalPages={10} />,
};

export const LastPage: StoryObj<PaginationComponent> = {
  render: () => <mvx-pagination currentPage={10} totalPages={10} />,
};

export const SinglePage: StoryObj<PaginationComponent> = {
  render: () => <mvx-pagination currentPage={1} totalPages={1} />,
};

export const ManyPages: StoryObj<PaginationComponent> = {
  render: () => <mvx-pagination currentPage={520} totalPages={1000} />,
};

export default storySettings;
