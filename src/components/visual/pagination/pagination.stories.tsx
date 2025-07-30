import { h } from '@stencil/core';
import type { Meta, StencilRenderer, StoryObj } from '@stencil/storybook-plugin';
import type { PartialStoryFn, StoryContext } from 'storybook/internal/csf';

import type { Pagination } from './pagination';

const themeDecorator = (Story: PartialStoryFn<StencilRenderer<Pagination>, Pagination>, context: StoryContext) => (
  <div data-mvx-theme={`mvx:${context.globals.backgrounds.value}-theme`} class="mvx:pt-40">
    <Story />
  </div>
);

const storySettings: Meta<Pagination> = {
  tags: ['autodocs'],
  title: 'Components/Pagination',
  decorators: [themeDecorator],
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
