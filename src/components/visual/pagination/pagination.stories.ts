import './pagination.scss';

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { Pagination } from './pagination';

// prettier-ignore
const styles = {
  paginationStoriesWrapper: 'pagination-stories-wrapper mvx:justify-center mvx:flex mvx:gap-4 mvx:pt-24',
} satisfies Record<string, string>;

const storySettings: Meta<Pagination> = {
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
    Story => html`
      <div class="${styles.paginationStoriesWrapper}">
        ${Story()}
      </div>
    `,
  ],
};

export const Default: StoryObj<Pagination> = {
  render: properties => html`
    <mvx-pagination
      currentPage="${properties.currentPage}"
      totalPages="${properties.totalPages}"
      ?isDisabled="${properties.isDisabled}"
      class="${properties.class || ''}"
    ></mvx-pagination>
  `,
};

export const Disabled: StoryObj<Pagination> = {
  render: () => html`
    <mvx-pagination currentPage="5" totalPages="20" ?isDisabled="${true}" class="custom-pagination"></mvx-pagination>
  `,
};

export const FirstPage: StoryObj<Pagination> = {
  render: () => html`
    <mvx-pagination currentPage="1" totalPages="10"></mvx-pagination>
  `,
};

export const LastPage: StoryObj<Pagination> = {
  render: () => html`
    <mvx-pagination currentPage="10" totalPages="10"></mvx-pagination>
  `,
};

export const SinglePage: StoryObj<Pagination> = {
  render: () => html`
    <mvx-pagination currentPage="1" totalPages="1"></mvx-pagination>
  `,
};

export const ManyPages: StoryObj<Pagination> = {
  render: () => html`
    <mvx-pagination currentPage="520" totalPages="1000"></mvx-pagination>
  `,
};

export default storySettings;
