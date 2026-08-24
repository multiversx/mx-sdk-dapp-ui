import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { IconNamesEnum } from 'common/Icon/icon.types';
import { createSimpleToast } from 'components/functional/toasts-list/tests/mocks/toasts';

import type { SimpleToast } from './simple-toast';

// prettier-ignore
const styles = {
  simpleToastStoriesWrapper: 'simple-toast-stories-wrapper mvx:flex mvx:flex-col mvx:gap-4 mvx:w-full mvx:max-w-md',
} satisfies Record<string, string>;

const storySettings: Meta<SimpleToast> = {
  tags: ['autodocs'],
  title: 'Toasts/SimpleToast',
  component: 'mvx-simple-toast',
  args: {
    toast: createSimpleToast(),
  },
  argTypes: {
    toast: { control: 'object' },
  },
};

export const Default: StoryObj<SimpleToast> = {
  render: properties => <mvx-simple-toast toast={properties.toast ?? createSimpleToast()} />,
};

export const TitleOnly: StoryObj<SimpleToast> = {
  render: () => <mvx-simple-toast toast={createSimpleToast({ title: 'Signature declined', message: undefined })} />,
};

export const WithSubtitle: StoryObj<SimpleToast> = {
  render: () => (
    <mvx-simple-toast
      toast={createSimpleToast({
        title: 'Batch submitted',
        subtitle: '3 transactions',
        message: 'They will be processed shortly.',
      })}
    />
  ),
};

export const IconVariants: StoryObj<SimpleToast> = {
  render: () => (
    <div class={styles.simpleToastStoriesWrapper}>
      <mvx-simple-toast
        toast={createSimpleToast({
          icon: IconNamesEnum.circleCheck,
          iconClassName: 'success',
          title: 'Success',
          message: 'The operation completed.',
        })}
      />

      <mvx-simple-toast
        toast={createSimpleToast({
          icon: IconNamesEnum.hourglass,
          iconClassName: 'pending',
          title: 'Warning',
          message: 'This is taking longer than usual.',
        })}
      />

      <mvx-simple-toast
        toast={createSimpleToast({
          icon: IconNamesEnum.triangularWarning,
          iconClassName: 'danger',
          title: 'Danger',
          message: 'Something went wrong.',
        })}
      />
    </div>
  ),
};

export const WithoutCloseButton: StoryObj<SimpleToast> = {
  render: () => <mvx-simple-toast toast={createSimpleToast({ hasCloseButton: false })} />,
};

export default storySettings;
