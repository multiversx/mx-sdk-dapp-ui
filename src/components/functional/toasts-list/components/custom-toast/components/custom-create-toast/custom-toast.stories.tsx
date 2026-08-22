import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { createComponentToast } from 'components/functional/toasts-list/tests/mocks/toasts';

import type { CustomToast } from './custom-toast';

const storySettings: Meta<CustomToast> = {
  tags: ['autodocs'],
  title: 'Toasts/CustomToast',
  component: 'mvx-custom-toast',
  parameters: {
    docs: {
      description: {
        component:
          'Renders an arbitrary `HTMLElement` returned by the `instantiateToastElement` function prop. Because the prop is a function it cannot be serialised, so these toasts are never persisted across a page reload.',
      },
    },
  },
  args: {
    toast: createComponentToast(),
  },
};

export const Default: StoryObj<CustomToast> = {
  render: properties => <mvx-custom-toast toast={properties.toast ?? createComponentToast()} />,
};

export const WithoutCloseButton: StoryObj<CustomToast> = {
  render: () => <mvx-custom-toast toast={createComponentToast({ hasCloseButton: false })} />,
};

export default storySettings;
