import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { createComponentToast, createSimpleToast } from 'components/functional/toasts-list/tests/mocks/toasts';

import type { GenericToast } from './generic-toast';

// prettier-ignore
const styles = {
  genericToastStoriesWrapper: 'generic-toast-stories-wrapper mvx:flex mvx:flex-col mvx:gap-4 mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<GenericToast> = {
  tags: ['autodocs'],
  title: 'Toasts/GenericToast',
  component: 'mvx-generic-toast',
  parameters: {
    docs: {
      description: {
        component:
          'Dispatcher for custom toasts: renders `mvx-custom-toast` when the payload carries `instantiateToastElement`, otherwise `mvx-simple-toast`.',
      },
    },
  },
  args: {
    toast: createSimpleToast(),
  },
  argTypes: {
    toast: { control: 'object' },
  },
};

export const SimpleToastBranch: StoryObj<GenericToast> = {
  render: properties => <mvx-generic-toast toast={properties.toast ?? createSimpleToast()} />,
};

export const ComponentToastBranch: StoryObj<GenericToast> = {
  render: () => <mvx-generic-toast toast={createComponentToast()} />,
};

export const BothBranches: StoryObj<GenericToast> = {
  render: () => (
    <div class={styles.genericToastStoriesWrapper}>
      <mvx-generic-toast toast={createSimpleToast({ title: 'Simple toast branch' })} />
      <mvx-generic-toast toast={createComponentToast()} />
    </div>
  ),
};

export default storySettings;
