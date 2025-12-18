import './pagination.scss';

import { h } from '@stencil/core';
import type { StoryObj } from '@stencil/storybook-plugin';

// prettier-ignore
const styles = {
  paginationStoriesWrapper: 'pagination-stories-wrapper mvx:justify-center mvx:flex mvx:gap-4 mvx:pt-24',
} satisfies Record<string, string>;

const storySettings = {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  args: {
    'current-page': 1,
    'total-pages': 10,
    'is-disabled': false,
    'class': '',
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

type PaginationPropsType = typeof storySettings.args;

export const Default: StoryObj<PaginationPropsType> = {
  render: props => {
    return <mvx-pagination {...props} />;
  },
};

export const Disabled: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination current-page={5} total-pages={20} is-disabled={true} class="custom-pagination" />,
};

export const FirstPage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination current-page={1} total-pages={10} />,
};

export const LastPage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination current-page={10} total-pages={10} />,
};

export const SinglePage: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination current-page={1} total-pages={1} />,
};

export const ManyPages: StoryObj<PaginationPropsType> = {
  render: () => <mvx-pagination current-page={520} total-pages={1000} />,
};

export default storySettings;
